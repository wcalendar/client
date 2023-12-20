import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { useMemo } from "react";
import { CategoryToRender, ScheduleToRender } from "./page";

type ScheduleLineProps = {
  categoryToRender: CategoryToRender;
}

const Container = styled.div<{ theme: DefaultTheme, $line_count: number }>`
  width: 100%;
  height: calc(${({ $line_count }) => 1.125 * $line_count}rem + ${({ theme, $line_count }) => ($line_count - 1) * theme.sizes.calendar.lineGap}px);
`;

const Line = styled.div<{ theme: DefaultTheme }>`
  position: relative;
  width: 100%;
  height: 1.125rem;
  margin-top: ${({ theme }) => theme.sizes.calendar.lineGap}px;
`;

// box-shadow: 1px 1px 2px .5px ${({ theme }) => theme.colors.black80};
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
  line-height: 1.125rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default function ScheduleLine({
  categoryToRender,
}: ScheduleLineProps) {
  console.log(categoryToRender);
  const { lines, category } = categoryToRender;
  const {} = category;

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
  }, [categoryToRender])

  return (
    <Container $line_count={lines.length}>
      {schedulesByLine.map((line, i) => (
        <Line key={`${category.id}-${i}`}>
          {line.map(schedule => (
            <ScheduleItem key={schedule.id} $start={schedule.startDay} $end={schedule.endDay} $color={category.color} $level={category.level}>
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