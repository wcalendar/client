import { CategoryColor, NewScheduleToRender } from "@/types";
import styled from "styled-components";
import CheckBox from "../common/CheckBox";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['start', 'end', 'color', 'level', 'isFinished'].includes(p),
})<{ start: number, end: number, color: CategoryColor, level: number, isFinished: boolean }>`
  position: absolute;
  left: calc(${({ start }) => `${start - 1} * var(--new-cell-width) + .5rem`});
  width: calc(${({ start, end }) => `(${end - start + 1} * var(--new-cell-width)) - 1rem`});
  height: var(--new-cell-height);
  padding: 0 .5rem;
  border-radius: 8px;
  background-color: ${({ theme, color, isFinished }) => isFinished ? `${theme.colors.black}0D` : theme.colors.newCategory(color, 2)};
  transition: background-color .25s ease;
  display: flex;
  gap: .25rem;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const Content = styled.div.withConfig({
  shouldForwardProp: p => !['color', 'isFinished'].includes(p),
})<{ color: CategoryColor, isFinished: boolean }>`
  max-width: calc(100% - 2.25rem);
  font-size: .9375rem;
  line-height: .9375rem;
  color: ${({ color, theme, isFinished }) => isFinished ? `${theme.colors.black}80` : theme.colors.newCategory(color, 0)};
  ${({ isFinished }) => isFinished ? 'text-decoration: line-through;' : ''}
  transition: color .25s ease;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MemoAlarmWrapper = styled.div`
  width: .25rem;
  height: .9375rem;
`;

const MemoAlarm = styled.div.withConfig({
  shouldForwardProp: p => !['color', 'isFinished'].includes(p),
})<{ color: CategoryColor, isFinished: boolean }>`
  width: .25rem;
  height: .25rem;
  border-radius: .25rem;
  transition: background-color .25s ease;
  background-color: ${({ color, theme, isFinished }) => isFinished ? `${theme.colors.black}80` : theme.colors.newCategory(color, 0)};
`;


interface ScheduleChipProps {
  schedule: NewScheduleToRender;
  onFinish: () => void;
}

export default function ScheduleChip({
  schedule,
  onFinish,
}: ScheduleChipProps) {
  const { startDayToRender, endDayToRender, categoryColor, categoryLevel, isFinished, content } = schedule;

  return (
    <Container
      start={startDayToRender}
      end={endDayToRender}
      color={categoryColor}
      level={categoryLevel}
      isFinished={isFinished}
    >
      <CheckBox size='big' checked={isFinished} onChange={onFinish} />
      <Content color={categoryColor} isFinished={isFinished}>{content}</Content>
      <MemoAlarmWrapper>
        <MemoAlarm color={categoryColor} isFinished={isFinished} />
      </MemoAlarmWrapper>
    </Container>
  );
}