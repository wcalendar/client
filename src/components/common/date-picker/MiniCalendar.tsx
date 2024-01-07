import time from "@/lib/time";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

type MiniCalendarProps = {
  date: Dayjs;
  onDateClick: (value: Dayjs) => void;
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 1.75rem;
  padding: .25rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: white;
  z-index: 1;
  animation-duration: .25s;
  animation-name: open;

  @keyframes open {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MonthSelector = styled.div`
  width: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 12.25rem;
  }
`;

const SlideButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background: inherit;
  border: none;
  cursor: pointer;
`;

const CurrentMonth = styled.div`
  width: 5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .875rem;
  font-weight: bold;
  text-align: center;
`;

const Calendar = styled.div`
  width: 17rem;
  margin: 0 auto;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 12.25rem;
  }
`;

const Week = styled.div`
  width: 100%;
  display: flex;
`;

const Day = styled.div<{ $is_today: string }>`
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  ${({ theme, $is_today }) => $is_today === 'true' ? `background-color: ${theme.colors.gray};` : ''}
  border-radius: 2rem;
  transition: all ease .25s;
  font-size: .75rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 1.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
`;

const BlankDay = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  user-select: none;
  font-size: .75rem;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 1.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
`;

const Footer = styled.div`
  width: 100%;
`;

const FooterButton = styled.button`
  width: auto;
  padding: 0 .5rem;
  font-size: .75rem;
  height: 1.75rem;
  line-height: 1.75rem;
  text-align: center;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }
`;

export default function MiniCalendar({
  date,
  onDateClick,
}: MiniCalendarProps) {
  const [month, setMonth] = useState<number>(date.month());
  const [year, setYear] = useState<number>(date.year());

  const calendarData = useMemo(() => {
    const result: (number | null)[][] = [];

    const firstDayOfWeek = time.new(year, month, 1).day();
    const lastDayInMonth = time.daysInMonth(year, month);
    console.log(lastDayInMonth);

    const firstWeek: (number | null)[] = Array.from({length: 7}, () => null);
    let dayToInput = 1;
    for(let i=firstDayOfWeek; i<7; i++) {
      firstWeek[i] = dayToInput++;
    }
    result.push(firstWeek);

    for(let i=dayToInput; i<=lastDayInMonth; ) {
      const week: (number | null)[] = Array.from({length: 7}, () => null);
      for(let j=0; j<7; j++) {
        week[j] = i++;
        if(i > lastDayInMonth) break;
      }
      result.push(week);
    }

    return result;
  }, [date, month, year]);

  const handleNextMonthClick = useCallback(() => {
    const newMonth = month+1;
    if(newMonth >= 12) {
      setMonth(0);
      setYear(year+1);
    } else {
      setMonth(newMonth);
    }
  }, [month, year]);

  const handlePrevMonthClick = useCallback(() => {
    const newMonth = month-1;
    if(newMonth <= -1) {
      setMonth(11);
      setYear(year-1);
    } else {
      setMonth(newMonth);
    }
  }, [month, year]);

  const handleTodayClick = useCallback(() => {
    setMonth(date.month());
    setYear(date.year());
  }, [date]);

  const handleDateClick = (day: number) => {
    onDateClick(time.new(year, month, day));
  }

  return (
    <Container>
      <MonthSelector>
        <SlideButton onClick={handlePrevMonthClick}><Icon path={mdiChevronLeft} /></SlideButton>
        <CurrentMonth>{`${year}.${month+1}`}</CurrentMonth>
        <SlideButton onClick={handleNextMonthClick}><Icon path={mdiChevronRight} /></SlideButton>
      </MonthSelector>
      <Calendar>
        <Week>
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <BlankDay key={day}>
              {day}
            </BlankDay>
          ))}
        </Week>
        {calendarData.map((week, i) => (
          <Week key={`w-${i}`}>
            {week.map((day, j) => (
              day ? (
                <Day key={`d-${i}-${j}`} $is_today={(date.year() === year && date.month() === month && date.date() === day) ? 'true' : 'false'} onClick={() => handleDateClick(day)}>
                  {day || ''}
                </Day>
              ) : (
                <BlankDay key={`d-${i}-${j}`} />
              )
            ))}
          </Week>
        ))}
      </Calendar>
      <Footer>
        <FooterButton onClick={handleTodayClick}>오늘</FooterButton>
      </Footer>
    </Container>
  )
}