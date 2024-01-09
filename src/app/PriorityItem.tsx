import styled from "styled-components";
import { DragEvent, DragEventHandler, MouseEvent, useEffect, useRef, useState } from "react";
import { CategoryColor, Priority } from "@/types";

type PriorityItemProps = {
  priority: Priority;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, groupCode: number) => void;
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
  padding-left: 1rem;
  padding-right: 1rem;
  ${({ $is_finished }) => $is_finished ? 'text-decoration: line-through;' : '' }
`;

const DragImage = styled.div`
  position: fixed;
  display: inline;
  pointer-events: none;
  width: auto;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  z-index: 20;
  background: white;
  padding: 0 .25rem;
`;

export default function PriorityItem({
  priority,
  onClick,
}: PriorityItemProps) {
  const { color, level, content, isFinished, categoryId, groupCode } = priority;

  const [isDraggingOver, setDraggingOver] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
    emptyImage.style.width = '1px';
    emptyImage.style.height = '1px';

    document.body.appendChild(emptyImage);

    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if(!isDragging) setDragging(true);
    setX(e.clientX);
    setY(e.clientY);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setDragging(false);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    
    e.dataTransfer.dropEffect = 'move';

    setDraggingOver(true);
  };

  const handleContainerDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';

    setDraggingOver(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
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
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragOver={handleContainerDragOver}
      >
        <Text $is_finished={isFinished ? 1 : 0}>
          {content}
        </Text>
      </Container>
      {isDragging && (<DragImage style={{ left: x+20, top: y+10, }} >{content}</DragImage>)}
    </Wrapper>
  )
}