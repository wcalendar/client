import styled from "styled-components";
import { MouseEvent } from "react";
import { CategoryColor, Priority } from "@/types";

type PriorityItemProps = {
  priority: Priority;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, groupCode: number) => void;
}

const _Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--cell-height) + var(--line-gap));
`;

const HalfArea = styled.div`
  width: 100%;
  height: 50%;
`;

const Container = styled.div<{ $color: CategoryColor, $level: number }>`
  position: absolute;
  left: 2px;
  top: calc(var(--line-gap) / 2);
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

  return (
    <_Container>
      <HalfArea />
      <HalfArea />
      <Container $color={color} $level={level} onClick={(e) => onClick(e, categoryId, groupCode)}>
        <Text $is_finished={isFinished ? 1 : 0}>
          {content}
        </Text>
      </Container>
    </_Container>
  )
}