import styled from "styled-components"
import PriorityItem from "./PriorityItem";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { DragEventHandler, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { Priority } from "@/types";

type PriorityListProps = {
  priorities: Priority[];
  prioritiesSize: number;
  onPriorityItemClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, groupCode: number) => void;
  idx: number;
}

const Container = styled.div<{ $idx: number, $priority_count: number, $open: number }>`
  box-sizing: content-box;
  position: absolute;
  left: calc((${({ $idx }) => $idx} * (var(--cell-width) + 1px)) + 2px);
  height: ${({ $open, $priority_count }) => $open ? `calc(((var(--cell-height) + var(--line-gap)) * ${$priority_count + 1}) + 3px)` : '100%'};
  width: calc(var(--cell-width) + 1px - 4px);
  background: ${({ theme }) => theme.colors.lightBlue};
  transition: all ease .25s;
  ${({ theme, $open }) => $open ? `
    box-shadow: 0 0 4px 2px ${theme.colors.gray};
    border-radius: 5px;
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
`;

const IconWrapper = styled.div`
  width: calc(var(--cell-height));
  height: calc(var(--cell-height));
  padding: 3%;
`;

const DropArea = styled.div`
  width: 100%;
  height: calc(var(--line-gap));

  &.dragover {
    border-bottom: 4px solid black;
  }
`;

export default function PriorityList({
  priorities,
  prioritiesSize,
  onPriorityItemClick,
  idx,
}: PriorityListProps) {
  const [isOpen, setOpen] = useState(false);
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

  const handleOpenChange = () => {
    setOpen(!isOpen);
  };

  const handleDropAreaDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    const draggableDay = parseInt(e.dataTransfer.types[0].split('-')[1]);
    if(draggableDay === idx) {
      e.preventDefault();
      
      e.dataTransfer.dropEffect = 'move';
      
      setDraggingOver(true);
    }
  };

  const handleDropAreaDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
  };

  const handleDropAreaDrop: DragEventHandler<HTMLDivElement> = (e) => {
    setDraggingOver(false);
  };

  const buttonText = useMemo(() => {
    return isOpen ? '접기' : '펼치기';
  }, [isOpen]);


  const openable = useMemo(() => {
    return priorityCount > prioritiesSize;
  }, [priorityCount, prioritiesSize]);

  return (
    <Container $idx={idx} $priority_count={priorityCount} $open={isOpen ? 1 : 0}>
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
            idx={idx}
          />
        ))}
      </List>
      {openable && (
        <ButtonBox>
          <MoreButton onClick={handleOpenChange}>
            {buttonText}
            <IconWrapper>
              <Icon path={isOpen ? mdiChevronUp : mdiChevronDown} />
            </IconWrapper>
          </MoreButton>
        </ButtonBox>
      )}
    </Container>
  )
}