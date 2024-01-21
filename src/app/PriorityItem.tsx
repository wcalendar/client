import styled from "styled-components";
import { DragEvent, DragEventHandler, MouseEvent, useEffect, useRef, useState } from "react";
import { CategoryColor, Priority } from "@/types";

type PriorityItemProps = {
  priority: Priority;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, groupCode: number) => void;
  onDrag: (newX: number, newY:number, priority: Priority) => void;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (day: number, draggableIdx: number, droppableIdx: number) => void;
  day: number;
  idx: number;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--cell-height) + var(--line-gap));

  &.dragover {
    border-bottom: 4px solid black;
  }
`;

const Container = styled.div<{ $color: CategoryColor, $level: number }>`
  height: var(--cell-height);
  width: calc((var(--cell-width) + 1px) - 9px);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
  vertical-align: middle;
  display: flex;
  cursor: pointer;
  transition: all ease .25s;

  &:hover {
    transform: translateX(-.5px) translateY(-.5px);
    box-shadow: 1px 1px 2px .5px ${({ theme }) => theme.colors.black80};
  }
`;

const Text = styled.span<{ $is_finished: number }>`
  width: auto;
  height: 100%;
  font-size: .75rem;
  user-select: none;
  line-height: var(--cell-height);
  padding-left: .5rem;
  padding-right: .5rem;
  overflow-x: hidden;
  ${({ $is_finished }) => $is_finished ? 'text-decoration: line-through;' : '' }
`;

export default function PriorityItem({
  priority,
  onClick,
  onDrag,
  onDragEnd,
  onDrop,
  day,
  idx,
}: PriorityItemProps) {
  const { color, level, content, isFinished, categoryId, groupCode, scheduleId } = priority;

  const [isDraggingOver, setDraggingOver] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!(wrapperRef.current)) {
      return;
    }

    if(isDraggingOver) {
      if(!wrapperRef.current.classList.contains('dragover')) {
        wrapperRef.current.classList.add('dragover');
      }
    } else {
      if(wrapperRef.current.classList.contains('dragover')) {
        wrapperRef.current.classList.remove('dragover');
      }
    }
    
  }, [isDraggingOver]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const emptyImage = document.createElement('div');
    emptyImage.id = 'drag-image';
    emptyImage.style.width = '1px';
    emptyImage.style.height = '1px';

    document.body.appendChild(emptyImage);

    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData(`day-${day}`, `${idx-1}`);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    const draggableDay = parseInt(e.dataTransfer.types[0].split('-')[1]);
    if(draggableDay === day) {
      e.preventDefault();
      
      e.dataTransfer.dropEffect = 'move';
      
      setDraggingOver(true);
    }
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const draggableDay = parseInt(e.dataTransfer.types[0].split('-')[1]);
    if(draggableDay === day) {
      e.preventDefault();
      const draggableIdx = e.dataTransfer.getData(`day-${day}`)
      onDrop(day, parseInt(draggableIdx), idx);
      
      setDraggingOver(false);
    }
  };

  return (
    <Wrapper
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={wrapperRef}
    >
      <Container
        $color={color}
        $level={level}
        onClick={(e) => onClick(e, categoryId, groupCode)}
        draggable
        onDragStart={handleDragStart}
        onDrag={(e) => onDrag(e.clientX, e.clientY, priority)}
        onDragEnd={onDragEnd}
        onDragOver={handleDragOver}
      >
        <Text $is_finished={isFinished ? 1 : 0}>
          {content}
        </Text>
      </Container>
    </Wrapper>
  )
}