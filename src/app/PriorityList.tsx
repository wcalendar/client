import styled from "styled-components"
import { Priority } from "./page";
import PriorityItem from "./PriorityItem";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { MouseEvent, useMemo } from "react";

type PriorityListProps = {
  priorities: Priority[];
  prioritiesSize: number;
  onResize: (size: number) => void;
  onPriorityItemClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, scheduleId: number) => void;
}

const Container = styled.div`
  height: 100%;
  width: calc((var(--cell-width) + 1px));
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

export default function PriorityList({
  priorities,
  prioritiesSize,
  onResize,
  onPriorityItemClick,
}: PriorityListProps) {
  const priorityCount = priorities.length;

  const buttonText = useMemo(() => {
    if(prioritiesSize < priorityCount) return `+${priorityCount - prioritiesSize} 펼쳐보기`;
    else if(prioritiesSize >= priorityCount) return '접어보기';
  }, [prioritiesSize]);

  return (
    <Container>
      <List>
        {priorities.map(priority => (
          <PriorityItem
            key={`pi-${priority.scheduleId}`}
            priority={priority}
            onClick={onPriorityItemClick}
          />
        ))}
      </List>
      <ButtonBox>
        <MoreButton onClick={() => onResize(priorityCount)}>
          {buttonText}
          <IconWrapper>
            <Icon path={mdiChevronDown} />
          </IconWrapper>
        </MoreButton>
      </ButtonBox>
    </Container>
  )
}