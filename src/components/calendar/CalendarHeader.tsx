import styled from "styled-components";
import Button from "../common/Button";
import MonthPicker from "../common/month-picker/MonthPicker";
import SearchBar from "../common/SearchBar/SearchBar";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import { useCallback } from "react";
import time from "@/lib/time";
import useDevice from "@/hooks/useDevice";

const Container = styled.div`
  width: 100%;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.devices.tablet} {
    height: 8.75rem;
    flex-direction: column;
    gap: 1.25rem;
    justify-content: center;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    height: 10rem;
    gap: .75rem;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .75rem;
`;

const CalendarModeButtons = styled.div`
  display: flex;
  gap: .75rem;
  flex: auto 0 0;

  @media ${({ theme }) => theme.devices.mobile} {
    flex: 100% 0 0;
  }
`;

const MonthPickerWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  flex: auto 0 0;
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
  const device = useDevice();
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

  if(device) {
    if(device === 'desktop') {
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
    } else if(device === 'tablet') {
      return (
        <Container>
          <Line>
            <Button icon='arrowLeft' width='auto' type='white' paddingHorizontal='.75rem' onClick={handlePrevMonthClick}>{''}</Button>
            <MonthPickerWrapper>
              <MonthPicker buttonType='big' value={currentDate} onChange={() => {}} />
              <Button width='auto' type='white' paddingHorizontal='.75rem' onClick={handleTodayClick}>오늘</Button>
            </MonthPickerWrapper>
            <Button icon='arrowRight' width='auto' type='white' paddingHorizontal='.75rem' onClick={handleNextMonthClick}>{''}</Button>
          </Line>
          <Line>
            <CalendarModeButtons>
              <Button icon='category' width='auto' type={calendarMode === 'category' ? 'primary' : 'white'} paddingHorizontal='.75rem' onClick={() => onCalendarModeChange('category')}>카테고리 캘린더</Button>
              <Button icon='calendarSmall' width='auto' type={calendarMode === 'month' ? 'primary' : 'white'} paddingHorizontal='.75rem' onClick={() => onCalendarModeChange('month')}>월 캘린더</Button>
            </CalendarModeButtons>
            <SearchBar />
          </Line>
        </Container>
      );
    } else if(device === 'mobile') {
      return (
        <Container>
          <Line>
            <Button icon='category' width='50%' type={calendarMode === 'category' ? 'primary' : 'white'} onClick={() => onCalendarModeChange('category')}>카테고리 캘린더</Button>
            <Button icon='calendarSmall' width='50%' type={calendarMode === 'month' ? 'primary' : 'white'} onClick={() => onCalendarModeChange('month')}>월 캘린더</Button>
          </Line>
          <Line>
            <Button icon='arrowLeft' width='auto' type='white' paddingHorizontal='.75rem' onClick={handlePrevMonthClick}>{''}</Button>
            <MonthPicker buttonType='big' value={currentDate} onChange={() => {}} />
            <Button icon='arrowRight' width='auto' type='white' paddingHorizontal='.75rem' onClick={handleNextMonthClick}>{''}</Button>
          </Line>
          <Line>
            <ButtonWrapper>
              <Button width='auto' type='white' paddingHorizontal='.75rem' onClick={handleTodayClick}>오늘</Button>
            </ButtonWrapper>
            <SearchBar />
          </Line>
        </Container>
      );
    }
  } else {
    return <Container />;
  }

  return (
    <Container>
      {device && device === 'desktop' ? (
        <>
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
        </>
      ) : ( device )}
    </Container>
  );
}