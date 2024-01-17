import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import MonthlyCalendar from './MonthlyCalendar';
import time from '@/lib/time';
import Icon from '@mdi/react';
import { mdiChevronLeftBoxOutline, mdiChevronRightBoxOutline } from '@mdi/js';

type MonthlyProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 1.875rem;
  gap: 1rem;
`;

const ArrowButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const Date = styled.div`
  font-size: .875rem;
  font-weight: bold;
  height: 1.875rem;
  line-height: 1.875rem;
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
          <Icon path={mdiChevronLeftBoxOutline} />
        </ArrowButton>
        <Date onClick={() => handleCalendarShow(isCalendarShow)}>
          {time.toString(value, 'YYYY. MM.')}
        </Date>
        <ArrowButton onClick={handleNextClick}>
        <Icon path={mdiChevronRightBoxOutline} />
        </ArrowButton>
      </Container>
      {isCalendarShow && <MonthlyCalendar date={value} onChange={onChange} />}
    </div>
  );
}
