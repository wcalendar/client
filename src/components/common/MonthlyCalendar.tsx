import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import dayjs from 'dayjs';
import { useState } from 'react';

const MonthlyCalendarContainer = styled.div<{ pathname: string }>`
  z-index: 10;
  border: 1px solid black;
  padding: 1rem;
  background-color: white;
  top: ${({ pathname }) => (pathname === '/category' ? '92px' : '40px')};
  position: fixed;
`;

const MonthsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const MonthsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MonthlyHeaderButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const MonthButton = styled.button<{
  month: number;
  currentMonth: number;
}>`
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  color: ${({ month, currentMonth }) =>
    month === currentMonth ? 'blue' : 'gray'};
  font-weight: ${({ month, currentMonth }) =>
    month === currentMonth ? 'bold' : 'normal'};
`;

const MonthlyHeaderControls = styled.div`
  display: flex;
`;

type MonthlyCalendarProps = {
  date: string;
};

const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getPrevYear = (date: string): string => {
  const prevYear = dayjs(date).subtract(1, 'y');
  return prevYear.format('YYYY');
};

const getNextYear = (date: string): string => {
  const prevYear = dayjs(date).add(1, 'y');
  return prevYear.format('YYYY');
};

export default function MonthlyCalendar({ date }: MonthlyCalendarProps) {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<string>(date.split('.')[0]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    parseInt(date.split('.')[1]),
  );

  return (
    <MonthlyCalendarContainer pathname={pathname}>
      <MonthsHeader>
        <span>{currentYear}년</span>
        <MonthlyHeaderControls>
          <MonthlyHeaderButton
            onClick={() => {
              setCurrentYear(getNextYear(currentYear));
            }}
          >
            <RiArrowUpSLine />
          </MonthlyHeaderButton>
          <MonthlyHeaderButton
            onClick={() => {
              setCurrentYear(getPrevYear(currentYear));
            }}
          >
            <RiArrowDownSLine />
          </MonthlyHeaderButton>
        </MonthlyHeaderControls>
      </MonthsHeader>
      <MonthsContainer>
        {months.map((month, i) => (
          <MonthButton
            key={i}
            month={month}
            currentMonth={currentMonth}
            onClick={() => {
              setCurrentMonth(month);
            }}
          >
            {month}
          </MonthButton>
        ))}
      </MonthsContainer>
    </MonthlyCalendarContainer>
  );
}
