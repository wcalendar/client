import Svgs from "@/assets/Svgs";
import time from "@/lib/time";
import { ModalStatus } from "@/types";
import { Dayjs } from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['buttonType'].includes(p),
})<{ buttonType: ButtonType }>`
  width: 12.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: ${({ buttonType }) => buttonType === 'big' ? 'center' : 'flex-start'};
  align-items: center;
  position: relative;
  gap: .5rem;
  cursor: pointer;
`;

const Date = styled.div.withConfig({
  shouldForwardProp: p => !['buttonType'].includes(p),
})<{ buttonType: ButtonType }>`
  height: ${({ buttonType }) => buttonType === 'big' ? '1.75rem' : '1.375rem'};
  font-size: ${({ buttonType }) => buttonType === 'big' ? '1.75rem' : '1.375rem'};
  font-weight: bold;
  user-select: none;
`;

const Calendar = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  top: 3.5rem;
  width: 100%;
  border: 1px solid ${({ theme }) => `${theme.colors.black}33`};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  box-shadow: 4px 4px 12px 0 ${({ theme }) => `${theme.colors.black}1F`};
  cursor: default;
  transform: translateY(${({ status }) => status === 'open' ? '0%' : '-10%'});
  opacity: ${({ status }) => status === 'open' ? 1 : 0};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
`;

const CalendarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.black}33`};
  margin-bottom: .5rem;
`;

const CalendarButton = styled.button`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

const Year = styled.div`
  font-size: .9375rem;
  font-weight: bold;
`;

const CalendarContent = styled.div`
  padding: 0 .5rem;
`;

const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

const MonthLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MonthButton = styled.button.withConfig({
  shouldForwardProp: p => !['selected'].includes(p),
})<{ selected: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  font-size: .8125rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
  background-color: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.black};

  ${({ selected, theme }) => !selected ? `
  &:hover {
    color: ${theme.colors.primary};
    font-weight: bold;
    background-color: ${theme.colors.primary}0D;
  }
  ` : ''}
`;

type ButtonType = 'small' | 'big';

interface MonthPickerProps {
  buttonType: ButtonType;
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

export default function MonthPicker({
  buttonType,
  value,
  onChange,
}: MonthPickerProps) {
  const [status, setStatus] = useState<ModalStatus>('closed');
  const [year, setYear] = useState(value.year());

  const monthPickerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(calendarRef.current && !calendarRef.current.contains(e.target as Node) && monthPickerRef.current && !monthPickerRef.current.contains(e.target as Node)) {
        setStatus('closing');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleDateClick = useCallback(() => {
    setStatus('open');
  }, []);

  const handleCalendarAnimationEnd = useCallback(() => {
    if(status === 'closing') setStatus('closed');
  }, [status]);

  const handleYearChange = useCallback((amount: number) => {
    if(year + amount > 1970 && year + amount < 10000) setYear(year + amount);
  }, [year]);

  const handleMonthClick = useCallback((month: number) => {
    onChange(time.new(year, month));
  }, [year, onChange]);

  return (
    <Container buttonType={buttonType} onClick={handleDateClick} ref={monthPickerRef}>
      {buttonType === 'big' && <Svgs svgKey='calendar' />}
      <Date buttonType={buttonType}>{time.toString(value, 'YYYY. MM')}</Date>
      {buttonType === 'small' && <Svgs svgKey='arrowDown' />}

      {status !== 'closed' && (
        <Calendar status={status} ref={calendarRef} onAnimationEnd={handleCalendarAnimationEnd}>
          <CalendarTitle>
            <CalendarButton onClick={() => handleYearChange(-1)}><Svgs svgKey='arrowLeftSmall' /></CalendarButton>
            <Year>{year}</Year>
            <CalendarButton onClick={() => handleYearChange(1)}><Svgs svgKey='arrowRightSmall' /></CalendarButton>
          </CalendarTitle>
          <CalendarContent>
            <MonthList>
              {[0, 1, 2, 3].map(lineIdx => (
                <MonthLine key={`month-line-${lineIdx}`}>
                  {[0, 1, 2].map(monthIdx => {
                    const month = 3 * lineIdx + monthIdx;
                    return (
                      <MonthButton
                        key={`month-${month}`}
                        selected={year === value.year() && value.month() === month}
                        onClick={() => handleMonthClick(month)}
                      >
                        {(month + 1) < 10 ? `0${month + 1}` : month + 1}
                      </MonthButton>
                    );
                  })}
                </MonthLine>
              ))}
            </MonthList>
          </CalendarContent>
        </Calendar>
      )}
    </Container>
  );
}