import Svgs from "@/assets/Svgs";
import { CategoryColor, Priority } from "@/types";
import styled from "styled-components";
import CheckBox from "../common/CheckBox";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['color'].includes(p),
})<{ color: CategoryColor }>`
  height: 3.75rem;
  padding: 0 .5rem;
  border-radius: 8px;
  display: flex;
  gap: .25rem;
  align-items: center;
  background-color: ${({ theme, color }) => theme.colors.newCategory(color, 2)};
  cursor: pointer;
  flex-direction: row;

  .move {
    cursor: grab;
  }

  .move path {
    fill: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: row-reverse;
  }
`;

const Content = styled.div.withConfig({
  shouldForwardProp: p => !['color'].includes(p),
})<{ color: CategoryColor }>`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  user-select: none;
`;


interface PriorityChipProps {
  priority: Priority;
  onFinish: () => void;
}

export default function PriorityChip({
  priority,
  onFinish,
}: PriorityChipProps) {
  const { color, isFinished } = priority;

  return (
    <Container color={color}>
      <Svgs svgKey='move' className='move' />
      <Content color={color}>{priority.content}</Content>
      <CheckBox size='big' checked={isFinished} onChange={onFinish} />
    </Container>
  );
}