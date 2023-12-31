import styled from "styled-components";
import { MouseEvent, MouseEventHandler, useMemo } from "react";
import { CategoryToRender, ScheduleModalInfo, ScheduleToRender } from "./page";
import { CategoryColor } from "@/dummies/calendar";

type ScheduleLineProps = {
  categoryIdx: number;
  categoryToRender: CategoryToRender;
  onScheduleClick: (info: ScheduleModalInfo) => void;
}

const Container = styled.div<{ $line_count: number }>`
  width: 100%;
  height: calc(${({ $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * var(--line-gap))`});
`;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: var(--cell-height);
  margin-top: var(--line-gap);
`;

// box-shadow: 1px 1px 2px .5px ${({ theme }) => theme.colors.black80};
const ScheduleItem = styled.div<{ $start: number, $end: number, $color: CategoryColor, $level: number }>`
  position: absolute;
  top: 0;
  left: calc(${({ $start }) => `${$start - 1} * (var(--cell-width) + 1px)`});
  height: 100%;
  width: calc(${({ $start, $end }) => `(${$end - $start + 1} * (var(--cell-width) + 1px)) - 5px`});
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

const ScheduleItemText = styled.span`
  position: sticky;
  left: 0;
  width: auto;
  height: 100%;
  font-size: .75rem;
  user-select: none;
  line-height: var(--cell-height);
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default function ScheduleLine({
  categoryIdx,
  categoryToRender,
  onScheduleClick,
}: ScheduleLineProps) {
  const { lines, category } = categoryToRender;

  const schedulesByLine = useMemo(() => {
    return categoryToRender.lines.map(line => {
      const scheduleList: ScheduleToRender[] = [];

      let scheduleId: number | undefined = undefined;
      for(let i=0; i<line.length; i++) {
        if(!line[i]) continue;
        if(scheduleId && scheduleId === line[i]!.id) continue;

        scheduleList.push(line[i]!);
        scheduleId = line[i]!.id;
      }

      return scheduleList;
    })
  }, [categoryToRender]);

  const handleScheduleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, lineIdx: number, scheduleIdx: number, schedule: ScheduleToRender) => {
    const scheduleModalInfo: ScheduleModalInfo = {
      categoryIdx,
      lineIdx,
      scheduleIdx,
      x: e.clientX,
      y: e.clientY,
      schedule,
    }

    onScheduleClick(scheduleModalInfo);
  }

  return (
    <Container $line_count={lines.length}>
      {schedulesByLine.map((line, lineIdx) => (
        <Line key={`${category.id}-${lineIdx}`}>
          {line.map((schedule) => (
            <ScheduleItem
              key={schedule.id}
              $start={schedule.startDay}
              $end={schedule.endDay}
              $color={category.color}
              $level={category.level}
              onClick={(e) => handleScheduleClick(e, lineIdx, schedule.startDay-1, schedule)}
            >
              <ScheduleItemText>
                {schedule.title}
              </ScheduleItemText>
            </ScheduleItem>
          ))}
        </Line>
      ))}
    </Container>
  )
}