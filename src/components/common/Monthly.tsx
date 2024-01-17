import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import MonthlyCalendar from './MonthlyCalendar';
import time from '@/lib/time';

type MonthlyProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
`;

const ArrowButton = styled(Button)`
  border: 1px solid gray;
  border-radius: 8px;
`;

const formattedDate = (date: dayjs.Dayjs) => {
  return date.format('YYYY. MM.');
};

export default function Monthly({
  value,
  onChange,
}: MonthlyProps) {
  const [isCalendarShow, setCalendarShow] = useState(false);

  const handlePrevClick = () => {
    onChange(value.add(-1, 'month'));
  };

  const handleNextClick = () => {
    onChange(value.add(1, 'month'));
  }

  const handleCalendarShow = (isCalendarShow: boolean) => {
    setCalendarShow(!isCalendarShow);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container>
        <ArrowButton onClick={handlePrevClick}>
          <RiArrowLeftSLine />
        </ArrowButton>
        <Button onClick={() => handleCalendarShow(isCalendarShow)}>
          {time.toString(value, 'YYYY. MM.')}
        </Button>
        <ArrowButton onClick={handleNextClick}>
          <RiArrowRightSLine />
        </ArrowButton>
      </Container>
      {isCalendarShow && <MonthlyCalendar date={value} />}
    </div>
  );
}
