import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import MonthlyCalendar from './MonthlyCalendar';

type MonthlyProps = {
  value: string;
  onChange: (value: string) => void;
}

const MonthlyContainer = styled.div`
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

const getPrevMonth = (date: string) => {
  const currentMonth = dayjs(date);
  return formattedDate(currentMonth.subtract(1, 'M'));
};

const getNextMonth = (date: string) => {
  const prevMonth = dayjs(date);
  return formattedDate(prevMonth.add(1, 'M'));
};

const formattedDate = (date: dayjs.Dayjs) => {
  return date.format('YYYY. MM.');
};

export default function Monthly({
  value,
  onChange,
}: MonthlyProps) {
  const [isCalendarShow, setCalendarShow] = useState<boolean>(false);

  const handleCalendarShow = (isCalendarShow: boolean) => {
    setCalendarShow(!isCalendarShow);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MonthlyContainer>
        <ArrowButton
          onClick={() => {
            onChange(getPrevMonth(value));
          }}
        >
          <RiArrowLeftSLine />
        </ArrowButton>
        <Button onClick={() => handleCalendarShow(isCalendarShow)}>
          {value}
        </Button>
        <ArrowButton
          onClick={() => {
            onChange(getNextMonth(value));
          }}
        >
          <RiArrowRightSLine />
        </ArrowButton>
      </MonthlyContainer>
      {isCalendarShow && <MonthlyCalendar date={value} />}
    </div>
  );
}
