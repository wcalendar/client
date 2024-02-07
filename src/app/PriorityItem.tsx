import styled from "styled-components";
import { DragEvent, DragEventHandler, MouseEvent, TouchEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { CategoryColor, Priority } from "@/types";
import Icon from "@mdi/react";
import { mdiUnfoldMoreHorizontal } from "@mdi/js";
import { usePopup } from "@/providers/PopupProvider/usePopup";

type PriorityItemProps = {
  priority: Priority;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: string, groupCode: string) => void;
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

const Container = styled.div<{ $color: CategoryColor, $level: number, $is_finished: number }>`
  height: var(--cell-height);
  width: calc(100% - 5px);
  background-color: ${({ theme, $color, $level, $is_finished }) => $is_finished ? theme.colors.finishedCategory($color) : theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: transform ease .25s, box-shadow ease .25s;

  &:hover {
    transform: translateX(-.5px) translateY(-.5px);
    box-shadow: 1px 1px 2px .5px ${({ theme }) => theme.colors.black80};
  }
`;

const Text = styled.span<{ $is_finished: number }>`
  flex: auto 0 1;
  height: 100%;
  font-size: .75rem;
  user-select: none;
  line-height: var(--cell-height);
  padding-left: .5rem;
  padding-right: .5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ $is_finished }) => $is_finished ? `
  text-decoration: line-through;
  opacity: .2;
  ` : '' }
`;

const IconWrapper = styled.div`
  flex: 1rem 0 0;
  height: 1rem;
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
  const { openPopup, closePopup } = usePopup();

  const { color, level, content, isFinished, categoryId, groupCode, scheduleId } = priority;

  const [isDraggingOver, setDraggingOver] = useState(false);
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);

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

  const openMobilePopup = useCallback(() => {
    openPopup({
      title: '우선순위 변경',
      description: <>우선순위 변경은 현재 데스크탑 환경에서만 가능합니다</>,
      buttons: [{ label: '확인', onClick: closePopup }],
    });
  }, []);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
    const timer = setTimeout(openMobilePopup, 500);
    setTouchTimer(timer);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if(touchTimer) clearTimeout(touchTimer);
  }, [touchTimer]);

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
        $is_finished={isFinished ? 1 : 0}
        onClick={(e) => onClick(e, categoryId, groupCode)}
        draggable
        onDragStart={handleDragStart}
        onDrag={(e) => onDrag(e.clientX, e.clientY, priority)}
        onDragEnd={onDragEnd}
        onDragOver={handleDragOver}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Text $is_finished={isFinished ? 1 : 0}>
          {content}
        </Text>
        <IconWrapper>
          <Icon path={mdiUnfoldMoreHorizontal} />
        </IconWrapper>
      </Container>
    </Wrapper>
  )
}