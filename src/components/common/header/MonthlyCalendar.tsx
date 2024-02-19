import styled from 'styled-components';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import time from '@/lib/time';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

const Container = styled.div`
  width: 12rem;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  background-color: white;
  position: absolute;
  top: 1.875rem;
  left: 2rem;
  animation-duration: .25s;
  animation-name: fromUpOpen;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Year = styled.div`
  width: auto;
  height: 1rem;
  line-height: 1rem;
  font-size: .875rem;
`;

const YearControls = styled.div`
  height: 1.5rem;
  display: flex;
`;

const YearControlButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color ease .25s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray}40;
  }
`;

const Calendar = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const MonthButton = styled.button<{ isCurrent: number; }>`
  width: 2.5rem;
  height: 2.5rem;
  font-size: .75rem;
  border: none;
  border-radius: 1.25rem;
  background-color: transparent;
  color: ${({ theme, isCurrent }) => isCurrent ? theme.colors.blue : theme.colors.gray};
  font-weight: ${({ isCurrent }) => isCurrent ? 'bold' : 'normal'};
  cursor: pointer;
  transition: background-color ease .25s, color ease .25s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
  }
`;

type MonthlyCalendarProps = {
  date: Dayjs;
  onChange: (value: Dayjs) => void;
};

const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MonthlyCalendar({
  date,
  onChange,
}: MonthlyCalendarProps) {
  const [year, setYear] = useState(date.year());
  const isCurrent = (m: number) => (year === date.year()) && (m === date.month());

  const handlePrevClick = () => {
    setYear(year - 1);
  };

  const handleNextClick = () => {
    setYear(year + 1);
  };

  return (
    <Container>
      <Header>
        <Year>{year}년</Year>
        <YearControls>
          <YearControlButton onClick={handleNextClick} >
            <Icon path={mdiChevronUp} />
          </YearControlButton>
          <YearControlButton onClick={handlePrevClick} >
            <Icon path={mdiChevronDown} />
          </YearControlButton>
        </YearControls>
      </Header>
      <Calendar>
        {months.map((m, i) => (
          <MonthButton
            key={`monthly-${i}`}
            isCurrent={isCurrent(i) ? 1 : 0}
            onClick={() => onChange(time.new(year, i, 1))}
          >
            {m}
          </MonthButton>
        ))}
      </Calendar>
    </Container>
  );
}
