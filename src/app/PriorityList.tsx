import styled from "styled-components"
import PriorityItem from "./PriorityItem";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { DragEvent, DragEventHandler, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Priority } from "@/types";

const Container = styled.div<{ $idx: number, $priority_count: number, $open: number }>`
  --priority-list-width: ${({ theme }) => theme.sizes.calendar.PriorityListWidth.desktop};
  transition: height ease .25s, width ease .25s, box-shadow ease .25s;

  @media ${({ theme }) => theme.devices.tablet} {
    --priority-list-width: ${({ theme }) => theme.sizes.calendar.PriorityListWidth.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --priority-list-width: ${({ theme }) => theme.sizes.calendar.PriorityListWidth.mobile};
  }

  box-sizing: content-box;
  position: absolute;
  left: calc((${({ $idx }) => $idx} * (var(--cell-width) + 1px)) + 2px);
  height: ${({ $open, $priority_count }) => $open ? `calc(((var(--cell-height) + var(--line-gap)) * ${$priority_count + 1}) + 3px)` : '100%'};
  width: ${({ $open }) => $open ? 'calc(var(--priority-list-width) + 1px - 4px)' : 'calc(var(--cell-width) + 1px - 4px)'};
  background: ${({ theme }) => theme.colors.lightBlue};
  
  ${({ theme, $open }) => $open ? `
    box-shadow: 0 0 2px 1px ${theme.colors.gray};
    border-radius: 5px;
    z-index: 5;
  ` : '' }
`;

const List = styled.div`
  height: calc(100% - var(--cell-height));
  overflow-y: hidden;

`;

const ButtonBox = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--cell-height));
`;

const MoreButton = styled.button`
  margin-left: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: .625rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: none;

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding-right: .5rem;
  } 
`;

const IconWrapper = styled.div`
  display: block;
  width: calc(var(--cell-height));
  height: calc(var(--cell-height));
  padding: 3%;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  } 
`;

const DropArea = styled.div`
  width: 100%;
  height: calc(var(--line-gap));

  &.dragover {
    border-bottom: 4px solid black;
  }
`;

interface PriorityListProps {
  priorities: Priority[];
  prioritiesSize: number;
  isOpened: boolean;
  onPriorityListOpen: (day: number) => void;
  onPriorityItemClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: string, groupCode: string) => void;
  onPriorityItemDrag: (newX: number, newY: number, priority: Priority) => void;
  onPriorityItemDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onPriorityItemDrop: (day: number, draggableIdx: number, droppableIdx: number) => void;
  day: number;
}

export default function PriorityList({
  priorities,
  prioritiesSize,
  isOpened,
  onPriorityListOpen,
  onPriorityItemClick,
  onPriorityItemDrag,
  onPriorityItemDragEnd,
  onPriorityItemDrop,
  day,
}: PriorityListProps) {
  const [isDraggingOver, setDraggingOver] = useState(false);

  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!(dropAreaRef.current)) {
      return;
    }

    if(isDraggingOver) {
      if(!dropAreaRef.current.classList.contains('dragover')) {
        dropAreaRef.current.classList.add('dragover');
      }
    } else {
      if(dropAreaRef.current.classList.contains('dragover')) {
        dropAreaRef.current.classList.remove('dragover');
      }
    }
    
  }, [isDraggingOver]);

  const priorityCount = priorities.length;

  const handleOpenChange = useCallback(() => {
    onPriorityListOpen(isOpened ? 0 : day+1);
  }, [isOpened, day]);

  const handleDropAreaDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    const draggableDay = parseInt(e.dataTransfer.types[0].split('-')[1]);
    if(draggableDay === day) {
      e.preventDefault();
      
      e.dataTransfer.dropEffect = 'move';
      
      setDraggingOver(true);
    }
  };

  const handleDropAreaDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
  };

  const handleDropAreaDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const draggableDay = parseInt(e.dataTransfer.types[0].split('-')[1]);
    if(draggableDay === day) {
      e.preventDefault();
      const draggableIdx = e.dataTransfer.getData(`day-${day}`)
      onPriorityItemDrop(day, parseInt(draggableIdx), 0);
      
      setDraggingOver(false);
    }
  };

  const buttonText = useMemo(() => {
    return isOpened ? '접기' : '펼치기';
  }, [isOpened]);


  const openable = useMemo(() => {
    return priorityCount > prioritiesSize;
  }, [priorityCount, prioritiesSize]);

  return (
    <Container $idx={day} $priority_count={priorityCount} $open={isOpened ? 1 : 0}>
      <List>
        <DropArea
          onDragOver={handleDropAreaDragOver}
          onDragLeave={handleDropAreaDragLeave}
          onDrop={handleDropAreaDrop}
          ref={dropAreaRef}
        />
        {priorities.map((priority, i) => (
          <PriorityItem
            key={`pi-${i}-${priority.scheduleId}`}
            priority={priority}
            onClick={onPriorityItemClick}
            onDrag={onPriorityItemDrag}
            onDragEnd={onPriorityItemDragEnd}
            onDrop={onPriorityItemDrop}
            day={day}
            idx={i+1}
          />
        ))}
      </List>
      {openable && (
        <ButtonBox>
          <MoreButton onClick={handleOpenChange}>
            {buttonText}
            <IconWrapper>
              <Icon path={isOpened ? mdiChevronUp : mdiChevronDown} />
            </IconWrapper>
          </MoreButton>
        </ButtonBox>
      )}
    </Container>
  )
}