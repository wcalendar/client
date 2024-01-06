import { CategoryColor } from "@/dummies/calendar";
import styled from "styled-components";
import { Priority } from "./page";
import { MouseEvent } from "react";

type PriorityItemProps = {
  priority: Priority;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, scheduleId: number) => void;
}

const Container = styled.div<{ $color: CategoryColor, $level: number }>`
  position: relative;
  height: var(--cell-height);
  width: calc((var(--cell-width) + 1px) - 9px);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: var(--line-gap);
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
  position: sticky;
  left: 0;
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
  const { color, level, content, isFinished, categoryId, scheduleId } = priority;

  return (
    <Container $color={color} $level={level} onClick={(e) => onClick(e, categoryId, scheduleId)}>
      <Text $is_finished={isFinished ? 1 : 0}>
        {content}
      </Text>
    </Container>
  )
}