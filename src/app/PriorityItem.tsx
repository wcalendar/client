import styled from "styled-components";
import { DragEventHandler, MouseEvent, useEffect, useRef, useState } from "react";
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
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 2px 2px 4px 1px ${({ theme }) => theme.colors.black80};
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

export default function PriorityItem({
  priority,
  onClick,
}: PriorityItemProps) {
  const { color, level, content, isFinished, categoryId, groupCode } = priority;

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

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {

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
  }

  return (
    <Wrapper
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={wrapperRef}
    >
      <Container
        $color={color}
        $level={level}
        onClick={(e) => onClick(e, categoryId, groupCode)}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleContainerDragOver}
      >
        <Text $is_finished={isFinished ? 1 : 0}>
          {content}
        </Text>
      </Container>
    </Wrapper>
  )
}