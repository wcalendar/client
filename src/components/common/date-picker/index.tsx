import Svgs from "@/assets/Svgs";
import time from "@/lib/time";
import { ModalStatus } from "@/types";
import { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width'].includes(p),
})<{ width: string}>`
  width: ${({ width }) => width};
  height: 2.5rem;
  position: relative;
`;

const Input = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  user-select: none;
  padding: 0 .5rem;
  display: flex;
  align-items: center;
`;

const InputText = styled.div.withConfig({
  shouldForwardProp: p => !['notSelected'].includes(p),
})<{ notSelected: boolean }>`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme, notSelected }) => notSelected ? theme.colors.black50 : theme.colors.black};  
`;

const IconWrapper = styled.div`
  flex: 1.5rem 0 0;
  height: 1.5rem;

  path {
    fill: ${({ theme }) => theme.colors.black50};
  }
`;

const Calendar = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  top: 3rem;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 12px;
  box-shadow: 4px 4px 12px 0 ${({ theme }) => theme.colors.black12};
  user-select: none;
  transform: ${({ status }) => status === 'open' ? 'translateY(0)' : 'translateY(-10%)'} ;
  opacity: ${({ status }) => status === 'open' ? '1' : '0'};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
`;

const CalendarHeader = styled.div`
  display: flex;
  height: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black20};
  justify-content: space-between;
`;

const CalendarHeaderButton = styled.button`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

const CalendarHeaderTitle = styled.div`
  font-size: .9375rem;
  font-weight: bold;
  line-height: 1.125rem;
`;

const Days = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: .75rem;
  margin-bottom: .75rem;
`;

const DayItem = styled.div.withConfig({
  shouldForwardProp: p => !['day'].includes(p),
})<{ day: number }>`
  flex: 1.25rem 0 0;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: .8125rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme, day }) => day === 0 ? theme.colors.warningRed : (day === 6 ? theme.colors.primary : theme.colors.black)};
`;

const Dates = styled.div`
  display: flex;  
  justify-content: space-between;
  margin-top: .5rem;
`;

const DateItem = styled.button.withConfig({
  shouldForwardProp: p => !['day', 'selected', 'isCurrentMonth'].includes(p),
})<{ day: number, selected: boolean, isCurrentMonth: boolean }>`
  flex: 1.25rem 0 0;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: .8125rem;
  text-align: center;
  border-radius: .25rem;
  transition: background-color .25s ease;
  cursor: pointer;
  background-color: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, day, selected, isCurrentMonth }) => selected ? theme.colors.white : (isCurrentMonth ? (day === 0 ? theme.colors.warningRed : (day === 6 ? theme.colors.primary : theme.colors.black)) : theme.colors.black20)};

  ${({ theme, selected, isCurrentMonth }) => !(selected || !isCurrentMonth) && `
  &:hover {
    background-color: ${theme.colors.primary05};
    color: ${theme.colors.primary};
  }
  `}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.black10};
    color: ${({ theme }) => theme.colors.black50};
  }
`;

interface DatePickerProps {
  width?: string;
  name?: string;
  min?: Dayjs;
  max?: Dayjs;
}

export default function DatePicker({
  width = '100%',
  name,
  min,
  max,
}: DatePickerProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarStatus, setCalendarStatus] = useState<ModalStatus>('closed');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<Dayjs>(time.new(time.now().year(), time.now().month(), 1));

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(inputRef.current && !inputRef.current.contains(e.target as Node) && calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarStatus('closing');
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const selectedDateObj = useMemo(() => {
    if(!selectedDate) return undefined;

    const splited = selectedDate.split(". ").map(str => parseInt(str));
    return time.new(splited[0], splited[1]-1, splited[2]);
  }, [selectedDate]);

  const calendarData = useMemo(() => {
    const result = [];

    const firstWeek = [];
    const firstDay = currentDate.day();
    for(let i=0; i<7; i++) {
      firstWeek.push(currentDate.add(i - firstDay, 'd'));
    }
    result.push(firstWeek);

    let weeks = 0;
    while(true) {
      const week = [];
      let start = (7-firstDay) + (weeks * 7);
      for(let amount=start; amount<start+7; amount++) {
        week.push(currentDate.add(amount, 'd'));
      }

      result.push(week);

      if(week[6].date() === currentDate.daysInMonth() || week[6].month() !== currentDate.month()) break;
      weeks++;
    }

    return result;
  }, [currentDate]);

  const handleInputClick = useCallback(() => {
    setCalendarStatus('open');
  }, []);

  const handleCalendarAnimationEnd = useCallback(() => {
    if(calendarStatus === 'closing') setCalendarStatus('closed');
  }, [calendarStatus]);


  const handleCurrentDateChange = useCallback((direction: number) => {
    setCurrentDate(currentDate.add(direction, 'month'));
  }, [currentDate]);

  const handleDateItemClick = useCallback((date: Dayjs) => {
    setSelectedDate(time.toString(date, 'YYYY. MM. DD'));
    setCalendarStatus('closing');
  }, []);

  return (
    <Container width={width}>
      <input name={name} type='hidden' value={selectedDate} onChange={() => {}} />
      <Input ref={inputRef} onClick={handleInputClick}>
        <InputText notSelected={!Boolean(selectedDate)}>{selectedDate || 'yyyy. mm. dd'}</InputText>
        <IconWrapper><Svgs svgKey={calendarStatus === 'closed' ? 'arrowDown' : 'arrowUp'} /></IconWrapper>
      </Input>
      {calendarStatus !== 'closed' && (
        <Calendar ref={calendarRef} status={calendarStatus} onAnimationEnd={handleCalendarAnimationEnd}>
          <CalendarHeader>
            <CalendarHeaderButton onClick={() => handleCurrentDateChange(-1)}><Svgs svgKey="arrowLeftSmall" /></CalendarHeaderButton>
            <CalendarHeaderTitle>{time.toString(currentDate, 'YYYY. MM')}</CalendarHeaderTitle>
            <CalendarHeaderButton onClick={() => handleCurrentDateChange(1)}><Svgs svgKey="arrowRightSmall" /></CalendarHeaderButton>
          </CalendarHeader>
          <Days>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <DayItem key={`dp-day-item-${i}`} day={i}>{day}</DayItem>
            ))}
          </Days>
          {calendarData.map((week, i) => (
            <Dates key={`dp-week-${currentDate.year()}-${currentDate.month()}-${i}`}>
              {week.map((date, i) => {
                const isInvalid = min ? (max ? !(date.isAfter(min) && date.isBefore(max)) : !date.isAfter(min)) : max ? !date.isBefore(max) : false;

                return (
                  <DateItem
                    key={`dp-date-${date.year()}-${date.month()}-${date.date()}`}
                    onClick={() => handleDateItemClick(date)}
                    day={i}
                    selected={Boolean(selectedDateObj && selectedDateObj.isSame(date))}
                    isCurrentMonth={date.month() === currentDate.month()}
                    disabled={isInvalid}
                  >
                    {date.date() < 10 ? `0${date.date()}` : date.date()}
                  </DateItem>
                )
              })}
            </Dates>
          ))}
        </Calendar>
      )}
    </Container>
  );
}