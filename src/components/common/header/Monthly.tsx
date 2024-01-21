import { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
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
  height: 100%;
  gap: 1rem;
  user-select: none;
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
  cursor: pointer;
`;

export default function Monthly({
  value,
  onChange,
}: MonthlyProps) {
  const monthlyRef = useRef<HTMLDivElement>(null);

  const [isCalendarShow, setCalendarShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(monthlyRef.current && !monthlyRef.current.contains(e.target as Node)) {
        setCalendarShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

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
    <Container ref={monthlyRef}>
      <ArrowButton onClick={handlePrevClick}>
        <Icon path={mdiChevronLeftBoxOutline} />
      </ArrowButton>
      <Date onClick={() => handleCalendarShow(isCalendarShow)}>
        {time.toString(value, 'YYYY. MM.')}
      </Date>
      <ArrowButton onClick={handleNextClick}>
      <Icon path={mdiChevronRightBoxOutline} />
      </ArrowButton>
      {isCalendarShow && <MonthlyCalendar date={value} onChange={onChange} />}
    </Container>
  );
}
