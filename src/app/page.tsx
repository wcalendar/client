'use client';

import Svgs from '@/assets/Svgs';
import BigCalendar from '@/components/bigCalendar';
import CalendarHeader, {
  CalendarMode,
} from '@/components/calendar/CalendarHeader';
import PrioritySheet from '@/components/calendar/PrioritySheet';
import CategoryCalendar from '@/components/calendar/category-calendar/CategoryCalendar';
import DailyMemoSheet from '@/components/calendar/daily-memo-sheet/DailyMemoSheet';
import useCalendar from '@/hooks/useCalendar';
import useDevice from '@/hooks/useDevice';
import time from '@/lib/time';
import { useCurrentDate } from '@/providers/CurrentDateProvider/useCurrentDate';
import { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--new-header-height));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black02};
  padding: 0 2rem;
  padding-bottom: 2.5rem;
`;

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 1.25rem;
`;

const sectionStyle = css`
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CalendarSection = styled.div`
  flex-grow: 1;
  overflow: hidden;
  ${sectionStyle}
`;

const Side = styled.div`
  flex: 27.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CloseButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.colors.black50};
  }
`;

const PrioritySheetSection = styled.div`
  flex: 35.25rem 0 0;
  overflow: hidden;
  padding: 1.5rem;
  ${sectionStyle}
`;

const DailyMemoSheetSection = styled.div`
  flex-grow: 1;
  min-height: 15rem;
  ${sectionStyle}
`;

export default function Home() {
  const device = useDevice();
  const {
    categoryToRenderList,
    openedCategories,
    prioritiesByDay,
    toggleCategoryOpen,
  } = useCalendar();
  const { currentDate } = useCurrentDate();

  const [calendarMode, setCalendarMode] = useState<CalendarMode>('category');
  const [selectedDate, setSelectedDate] = useState<Dayjs>();

  const handelCalendarModeChange = useCallback((value: CalendarMode) => {
    setCalendarMode(value);
  }, []);

  const handleDateSelect = useCallback(
    (value: number) => {
      setSelectedDate(time.new(currentDate.year(), currentDate.month(), value));
    },
    [currentDate],
  );

  const handleCloseButtonClick = useCallback(() => {
    setSelectedDate(undefined);
  }, []);

  return (
    <Container>
      <CalendarHeader
        calendarMode={calendarMode}
        onCalendarModeChange={handelCalendarModeChange}
      />
      <Body>
        {calendarMode === 'category' ? (
          <>
            <CalendarSection>
              <CategoryCalendar
                categoryToRenderList={categoryToRenderList}
                openedCategories={openedCategories}
                toggleCategoryOpen={toggleCategoryOpen}
                selectedDate={selectedDate?.date()}
                onDateSelect={handleDateSelect}
              />
            </CalendarSection>

            {device !== 'tablet' && device !== 'mobile' && selectedDate && (
              <Side>
                <CloseButton onClick={handleCloseButtonClick}>
                  <Svgs svgKey="doubleArrowRight" />
                </CloseButton>
                <PrioritySheetSection>
                  <PrioritySheet
                    date={selectedDate}
                    priorities={prioritiesByDay[selectedDate.date() - 1]}
                  />
                </PrioritySheetSection>
                <DailyMemoSheetSection>
                  <DailyMemoSheet />
                </DailyMemoSheetSection>
              </Side>
            )}
          </>
        ) : (
          <CalendarSection>
            <BigCalendar />
          </CalendarSection>
        )}
      </Body>
    </Container>
  );
}
