import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import time from '@/lib/time';

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

const MonthButton = styled.button<{ $is_current: number; }>`
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  color: ${({ theme, $is_current }) => $is_current ? theme.colors.blue : theme.colors.gray};
  font-weight: ${({ $is_current }) => $is_current ? 'bold' : 'normal'};
  cursor: pointer;
`;

const MonthlyHeaderControls = styled.div`
  display: flex;
`;

type MonthlyCalendarProps = {
  date: Dayjs;
  onChange: (value: Dayjs) => void;
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

export default function MonthlyCalendar({
  date,
  onChange,
}: MonthlyCalendarProps) {
  // TODO What's this?
  const pathname = usePathname();

  const [year, setYear] = useState(date.year());
  const isCurrent = (m: number) => (year === date.year()) && (m === date.month());

  const handlePrevClick = () => {
    setYear(year - 1);
  };

  const handleNextClick = () => {
    setYear(year + 1);
  };

  return (
    <MonthlyCalendarContainer pathname={pathname}>
      <MonthsHeader>
        <span>{year}년</span>
        <MonthlyHeaderControls>
          <MonthlyHeaderButton
            onClick={handleNextClick}
          >
            <RiArrowUpSLine />
          </MonthlyHeaderButton>
          <MonthlyHeaderButton
            onClick={handlePrevClick}
          >
            <RiArrowDownSLine />
          </MonthlyHeaderButton>
        </MonthlyHeaderControls>
      </MonthsHeader>
      <MonthsContainer>
        {months.map((m, i) => (
          <MonthButton
            key={`monthly-${i}`}
            $is_current={isCurrent(i) ? 1 : 0}
            onClick={() => onChange(time.new(year, i, 1))}
          >
            {m}
          </MonthButton>
        ))}
      </MonthsContainer>
    </MonthlyCalendarContainer>
  );
}
