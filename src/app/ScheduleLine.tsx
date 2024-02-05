import styled from "styled-components";
import { MouseEvent, useCallback, useMemo } from "react";
import { CategoryToRender, ScheduleModalInfo, ScheduleToRender } from "@/types";
import { CategoryColor } from "@/types";
import Cell from "./Cell";

type ScheduleLineProps = {
  categoryToRender: CategoryToRender;
  onScheduleClick: (info: ScheduleModalInfo) => void;
  onCellMouseOver: (cateogoryIdx: number) => void;
  onCellMouseOut: () => void;
  onCellClick: (categoryId: string, day: number) => void;
  categoryIdx: number;
}

const Container = styled.div<{ $line_count: number }>`
  width: 100%;
  height: calc(${({ $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * var(--line-gap))`});
  margin-bottom: var(--line-gap);
`;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: var(--cell-height);
  margin-bottom: var(--line-gap);
`;

// box-shadow: 1px 1px 2px .5px ${({ theme }) => theme.colors.black80};
const ScheduleItem = styled.div<{ $start: number, $end: number, $color: CategoryColor, $level: number, $is_finished: number }>`
  position: absolute;
  top: 0;
  left: calc(${({ $start }) => `${$start - 1} * (var(--cell-width) + 1px)`});
  height: 100%;
  width: calc(${({ $start, $end }) => `(${$end - $start + 1} * (var(--cell-width) + 1px)) - 5px`});
  background-color: ${({ theme, $color, $level, $is_finished }) => $is_finished ? theme.colors.finishedCategory($color) : theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
  vertical-align: middle;
  display: flex;
  cursor: pointer;
  transition: transform ease .25s, box-shadow ease .25s;

  &:hover {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 2px 2px 4px 1px ${({ theme }) => theme.colors.black80};
  }
`;

const ScheduleItemText = styled.span<{ $is_finished: number }>`
  position: sticky;
  left: 0;
  width: auto;
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

export default function ScheduleLine({
  categoryToRender,
  onScheduleClick,
  onCellMouseOver,
  onCellMouseOut,
  onCellClick,
  categoryIdx,
}: ScheduleLineProps) {
  const { lines, category } = categoryToRender;
  
  const schedulesByLine = useMemo(() => {
    return categoryToRender.lines.map(line => {
      const scheduleList: ScheduleToRender[] = [];

      let groupCode: string | undefined = undefined;
      for(let i=0; i<line.length; i++) {
        if(!line[i]) continue;
        if(groupCode && groupCode === line[i]!.groupCode) continue;

        scheduleList.push(line[i]!);
        groupCode = line[i]!.groupCode;
      }

      return scheduleList;
    })
  }, [categoryToRender]);

  const handleScheduleClick = useCallback((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, schedule: ScheduleToRender) => {
    const scheduleModalInfo: ScheduleModalInfo = {
      x: e.clientX,
      y: e.clientY,
      schedule,
    }

    onScheduleClick(scheduleModalInfo);
  }, [category]);

  return (
    <Container $line_count={lines.length}>
      {lines.map((line, lineIdx) => (
        <Line key={`${category.id}-${lineIdx}`}>
          {line.map((schedule, scheduleIdx) => schedule ? (
            <ScheduleItem
              key={`s-${schedule.groupCode}-${scheduleIdx}`}
              $start={schedule.startDate.date()}
              $end={schedule.endDate.date()}
              $color={category.color}
              $level={category.level}
              $is_finished={schedule.isFinished ? 1 : 0}
              onClick={(e) => handleScheduleClick(e, schedule)}
            >
              <ScheduleItemText $is_finished={schedule.isFinished ? 1 : 0}>
                {schedule.content}
              </ScheduleItemText>
            </ScheduleItem>
          ) : (
            <Cell
              key={`c-${category.id}-${lineIdx}-${scheduleIdx}`}
              start={scheduleIdx}
              categoryIdx={categoryIdx}
              categoryId={category.id}
              categoryColor={category.color}
              onMouseOver={onCellMouseOver}
              onMouseOut={onCellMouseOut}
              onClick={onCellClick}
            />
          ))}
        </Line>
      ))}
    </Container>
  )
}