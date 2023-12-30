'use client';

import Header from '@/components/common/Header';
import {
  CategoryWithSchedule,
  CategoryWithScheduleDto,
  ScheduleWithoutCategory,
  calendarDummyData,
} from '@/dummies/calendar';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import CategoryCell from './CategoryCell';
import ScheduleLine from './ScheduleLine';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import time from '@/lib/time';
import { Dayjs } from 'dayjs';
import NewScheduleModal from './NewScheduleModal';
import ScheduleModal from '@/components/common/schedule-modal/ScheduleModal';
import { useRouter } from 'next/navigation';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

export interface ScheduleToRender extends ScheduleWithoutCategory {
  startDay: number;
  endDay: number;
}

export type CategoryToRender = {
  category: CategoryWithSchedule;
  lines: (ScheduleToRender | undefined)[][];
};

export type ScheduleModalInfo = {
  x: number,
  y: number,
  schedule: ScheduleToRender,
}

/**
 * 서버에서 받은 카테고리 데이터를 화면에 렌더링하기 쉽게 다듬어주는 함수
 * @param categoryList 서버로부터 받은 카테고리 데이터
 * @param currentMonth 현재 월
 * @param lastDayInMonth 현재 월의 마지막 일
 * @returns
 */
const toRenderingData = (
  categoryList: CategoryWithScheduleDto[],
  currentDate: Dayjs,
  lastDayInMonth: number,
): CategoryToRender[] => {
  return categoryList.map<CategoryToRender>(category => {
    const newCategory: CategoryWithSchedule = {
      ...category,
      scheduleList: [],
    };
    const lines: (ScheduleToRender | undefined)[][] = [];
    lines.push(Array(lastDayInMonth));

    // Schedule은 반드시 정렬되어있어야 함
    category.scheduleList.forEach(schedule => {
      const lineCount = lines.length;
      const startDate = time.fromDate(schedule.startDate);
      const endDate = time.fromDate(schedule.endDate);
      const newSchedule: ScheduleWithoutCategory = {
        ...schedule,
        startDate,
        endDate,
      };
      newCategory.scheduleList.push(newSchedule);

      const startDay =
        startDate.year() < currentDate.year()
          ? 1
          : startDate.month() < currentDate.month()
            ? 1
            : startDate.date();
      const endDay =
        endDate.year() > currentDate.year()
          ? lastDayInMonth
          : endDate.month() > currentDate.month()
            ? lastDayInMonth
            : endDate.date();

      let isAllocated = false;
      for (let i = 0; i < lineCount; i++) {
        // 해당 라인에 이미 할당된 일정이 있다면 다음 라인으로
        if (lines[i][startDay - 1]) continue;

        // 할당된 일정이 없다면 일정 할당
        isAllocated = true;
        for (let day = startDay - 1; day <= endDay - 1; day++) {
          lines[i][day] = {
            ...newSchedule,
            startDay,
            endDay,
          };
        }
        break;
      }

      // 모든 라인에 할당되어 있으면 새 라인 생성하고 할당
      if (!isAllocated) {
        lines.push(Array(lastDayInMonth));
        for (let day = startDay - 1; day <= endDay - 1; day++) {
          lines[lines.length - 1][day] = {
            ...newSchedule,
            startDay,
            endDay,
          };
        }
      }
    });

    return {
      category: newCategory,
      lines,
    };
  });
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};
  --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.desktop};
  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.tablet};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.tablet};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.tablet};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.mobile};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.mobile};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.mobile};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.mobile};
  }
`;

const Calendar = styled.main`
  width: 100%;
  height: calc(100vh - 47.5px);
  display: flex;
`;

const CategorySide = styled.aside`
  position: relative;
  z-index: 2;
  height: 100%;
  width: calc(var(--cell-width) + 3px);
  border-right: 3px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: hidden;
`;

const ScheduleSide = styled.div`
  width: calc(100% - (var(--cell-width) + 3px));
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;

const CalendarHeader = styled.div<{ $day_count: number }>`
  position: sticky;
  z-index: 1;
  width: calc(${({ $day_count }) => `${$day_count} * (var(--cell-width) + ${$day_count === 1 ? 0 : 1}px)`});
  top: 0;
  display: flex;
  justify-content: flex-start;
  height: 2.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CalendarBody = styled.div<{ $day_count: number }>`
  width: calc(${({ $day_count }) => `${$day_count} * (var(--cell-width) + ${$day_count === 1 ? 0 : 1}px)`});
  position: relative;
`;

const SettingCategoryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0 0.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  font-size: 0.75rem;
  font-weight: bold;
  color: white;
`;

const DivideLines = styled.div<{ $day_count: number }>`
  position: absolute;
  left: 0;
  top: -2px;
  width: calc(${({ $day_count }) => `${$day_count} * (var(--cell-width) + 1px)`});
  height: calc(100% + 2px);
  display: flex;
`;

const DivideLine = styled.div`
  width: calc(var(--cell-width) + 1px);
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const AddScheduleButton = styled.button<{ $isOpen: string }>`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 3.375rem;
  height: 3.375rem;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 0.5rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: transform 0.25s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen === 'true' ? '45' : '0')}deg);
`;

export default function Home() {
  const [scheduleModalInfo, setScheduleModalInfo] = useState<ScheduleModalInfo | null>(null);
  const [isAddScheduleModalOpen, setAddScheduleModalOpen] = useState(false);
  const [categoryToRenderList, setCategoryToRenderList] = useState<
    CategoryToRender[]
  >([]);

  const categoryBody = useRef<HTMLDivElement>(null);
  const scheduleBody = useRef<HTMLDivElement>(null);

  const now = time.now();
  const lastDayOfMonth = now.daysInMonth();
  const calendarHeaderItems = useMemo(() => {
    let dayOfTheWeek = time.new(now.year(), now.month(), 1).day();

    return Array.from({ length: lastDayOfMonth }, (v, i) => i + 1).map(d => {
      const result = `${d}(${dayOfTheWeeks[dayOfTheWeek]})`;

      dayOfTheWeek++;
      if (dayOfTheWeek >= 7) dayOfTheWeek = 0;

      return result;
    });

    // TODO 월 선택 추가 시 월에 따라 달라져야함
  }, [now]);

  useEffect(() => {
    const categorySideBody = categoryBody.current!;
    const scheduleSideBody = scheduleBody.current!;
    scheduleSideBody.addEventListener('scroll', () => {
      categorySideBody.scrollTop = scheduleSideBody.scrollTop;
    });

    // 데이터를 가져와서 렌더링 데이터로 수정 후 저장
    // 임시로 가짜 데이터 사용
    setCategoryToRenderList(
      toRenderingData(calendarDummyData.categoryList, now, lastDayOfMonth),
    );
    // TODO 월 선택 추가 시 월에 따라 달라져야함
  }, []);

  const handleOpenAddScheduleModal = () => {
    setAddScheduleModalOpen(true);
  };

  const handleCloseAddScheduleModal = () => {
    setAddScheduleModalOpen(false);
  };

  const router = useRouter();
  const handleMoveCategoryPage = () => {
    router.push('/category');
  };

  const handleScheduleClick = (scheduleModalInfo: ScheduleModalInfo) => {
    setScheduleModalInfo(scheduleModalInfo);
  }

  return (
    <Container>
      <Header />
      <Calendar>
        <CategorySide ref={categoryBody}>
          <CalendarHeader $day_count={1}>
            <Cell isCategory>
              <SettingCategoryButton onClick={handleMoveCategoryPage}>
                카테고리 관리
              </SettingCategoryButton>
            </Cell>
          </CalendarHeader>
          <CalendarBody $day_count={1}>
            {categoryToRenderList.map(categoryToRender => (
              <CategoryCell
                key={categoryToRender.category.id}
                category={categoryToRender.category}
                lineCount={categoryToRender.lines.length}
              />
            ))}
          </CalendarBody>
        </CategorySide>
        <ScheduleSide ref={scheduleBody}>
          <CalendarHeader $day_count={lastDayOfMonth}>
            {calendarHeaderItems.map(headerItem => (
              <Cell key={headerItem}>{headerItem}</Cell>
            ))}
          </CalendarHeader>
          <CalendarBody $day_count={lastDayOfMonth}>
            <DivideLines $day_count={lastDayOfMonth}>
              {Array.from({ length: lastDayOfMonth }, () => null).map(
                (_, i) => (
                  <DivideLine key={`div${i}`} />
                ),
              )}
            </DivideLines>
            {categoryToRenderList.map(categoryToRender => (
              <ScheduleLine key={`schedule-${categoryToRender.category.id}`} categoryToRender={categoryToRender} onScheduleClick={handleScheduleClick} />
            ))}
          </CalendarBody>
        </ScheduleSide>
      </Calendar>
      <AddScheduleButton
        $isOpen={isAddScheduleModalOpen ? 'true' : 'false'}
        onClick={handleOpenAddScheduleModal}
      >
        <Icon path={mdiPlus} color="white" />
      </AddScheduleButton>
      {isAddScheduleModalOpen && (
        <NewScheduleModal
          width='40%'
          title='일정 추가'
          onClose={handleCloseAddScheduleModal}
        />
      )}
      {scheduleModalInfo && (
        <ScheduleModal scheduleModalInfo={scheduleModalInfo} />
      )}
    </Container>
  );
}
