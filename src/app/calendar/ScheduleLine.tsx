import styled from "styled-components";
import { CategoryToRender } from "./page";
import { DefaultTheme } from "styled-components/dist/types";
import { useMemo } from "react";
import { ScheduleWithoutCategory } from "@/dummies/calendar";

type ScheduleLineProps = {
  categoryToRender: CategoryToRender;
}

const Container = styled.div<{ theme: DefaultTheme, $line_count: number }>`
  width: 100%;
  height: calc(${({ $line_count }) => 1.125 * $line_count}rem + ${({ $line_count }) => ($line_count - 1) * 2}px);
`;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 1.125rem;
  margin-top: 2px;
`;

const ScheduleItem = styled.div<{ theme: DefaultTheme, $start: number, $end: number, $color: number, $level: number }>`
  position: absolute;
  top: 0;
  left: ${({ theme, $start }) => ($start - 1) * (theme.sizes.calendar.cellWidth + 1)}px;
  height: 100%;
  width: ${({ theme, $start, $end }) => ((($end - $start) + 1) * (theme.sizes.calendar.cellWidth + 1)) - 5}px;
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;

  font-size: .75rem;
  line-height: 1.125rem;
  padding-left: 1rem;
  user-select: none;
`;

export default function ScheduleLine({
  categoryToRender,
}: ScheduleLineProps) {
  const { lines, category } = categoryToRender;
  const {} = category;

  const schedulesByLine = useMemo(() => {
    return categoryToRender.lines.map(line => {
      const scheduleList: ScheduleWithoutCategory[] = [];

      let scheduleId: number | undefined = undefined;
      for(let i=0; i<line.length; i++) {
        if(!line[i]) continue;
        if(scheduleId && scheduleId === line[i]!.id) continue;

        scheduleList.push(line[i]!);
        scheduleId = line[i]!.id;
      }

      return scheduleList;
    })
  }, [categoryToRender])

  return (
    <Container $line_count={lines.length}>
      {schedulesByLine.map((line, i) => (
        <Line key={`${category.id}-${i}`}>
          {line.map(schedule => (
            <ScheduleItem key={schedule.id} $start={schedule.startDate.getDate()} $end={schedule.endDate.getDate()} $color={category.color} $level={category.level}>
              {schedule.title}
            </ScheduleItem>
          ))}
        </Line>
      ))}
    </Container>
  )
}