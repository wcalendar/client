import styled from "styled-components";
import Button from "../common/Button";
import MonthPicker from "../common/month-picker/MonthPicker";
import SearchBar from "../common/SearchBar/SearchBar";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import { useCallback } from "react";
import time from "@/lib/time";

const Container = styled.div`
  width: 100%;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarModeButtons = styled.div`
  display: flex;
  gap: .75rem;
`;

const MonthPickerWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export type CalendarMode = 'category' | 'month';

interface CalendarHeaderProps {
  calendarMode: CalendarMode;
  onCalendarModeChange: (value: CalendarMode) => void;
}

export default function CalendarHeader({
  calendarMode,
  onCalendarModeChange,
}: CalendarHeaderProps) {
  const {currentDate, setCurrentDate} = useCurrentDate();

  const handleNextMonthClick = useCallback(() => {
    setCurrentDate(currentDate.add(1, 'month'));
  }, [currentDate, setCurrentDate]);

  const handlePrevMonthClick = useCallback(() => {
    setCurrentDate(currentDate.add(-1, 'month'));
  }, [currentDate, setCurrentDate]);

  const handleTodayClick = useCallback(() => {
    setCurrentDate(time.new(time.now().year(), time.now().month()));
  }, [setCurrentDate]);

  return (
    <Container>
      <CalendarModeButtons>
        <Button icon='category' width='auto' type={calendarMode === 'category' ? 'primary' : 'white'} paddingHorizontal='.75rem' onClick={() => onCalendarModeChange('category')}>카테고리 캘린더</Button>
        <Button icon='calendarSmall' width='auto' type={calendarMode === 'month' ? 'primary' : 'white'} paddingHorizontal='.75rem' onClick={() => onCalendarModeChange('month')}>월 캘린더</Button>
      </CalendarModeButtons>
      <MonthPickerWrapper>
        <Button icon='arrowLeft' width='auto' type='white' paddingHorizontal='.75rem' onClick={handlePrevMonthClick}>{''}</Button>
        <MonthPicker buttonType='big' value={currentDate} onChange={() => {}} />
        <Button icon='arrowRight' width='auto' type='white' paddingHorizontal='.75rem' onClick={handleNextMonthClick}>{''}</Button>
        <Button width='auto' type='white' paddingHorizontal='.75rem' onClick={handleTodayClick}>오늘</Button>
      </MonthPickerWrapper>
      <SearchBar />
    </Container>
  );
}