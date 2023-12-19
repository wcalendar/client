'use client';

import Header from '@/components/common/Header';
import { CategoryWithSchedule, ScheduleWithoutCategory, calendarDummyData } from '@/dummies/calendar';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';
import Cell from './Cell';
import CategoryCell from './CategoryCell';
import ScheduleLine from './ScheduleLine';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

export type CategoryToRender = {
  category: CategoryWithSchedule;
  lines: (ScheduleWithoutCategory | undefined)[][];
}

/**
 * 서버에서 받은 카테고리 데이터를 화면에 렌더링하기 쉽게 다듬어주는 함수
 * @param categoryList 서버로부터 받은 카테고리 데이터
 * @param lastDayInMonth 카테고리가 포함된 월의 마지막 일
 * @returns 
 */
const toRenderingData = (categoryList: CategoryWithSchedule[], lastDayInMonth: number): CategoryToRender[] => {
  return categoryList.map<CategoryToRender>(category => {
    const lines: (ScheduleWithoutCategory | undefined)[][] = [];
    lines.push(Array(lastDayInMonth));

    // Schedule은 반드시 정렬되어있어야 함
    category.scheduleList.forEach(schedule => {
      const lineCount = lines.length;
      const startDay = schedule.startDate.getDate();
      const endDay = schedule.endDate.getDate();

      let isAllocated = false;
      for(let i=0; i<lineCount; i++) {
        // 해당 라인에 이미 할당된 일정이 있다면 다음 라인으로
        if(lines[i][startDay-1]) continue;
        
        // 할당된 일정이 없다면 일정 할당
        isAllocated = true;
        for(let day=startDay-1; day<=endDay-1; day++) {
          lines[i][day] = schedule;
        }
        break;
      }

      // 모든 라인에 할당되어 있으면 새 라인 생성하고 할당
      if(!isAllocated) {
        lines.push(Array(lastDayInMonth));
        for(let day=startDay-1; day<=endDay-1; day++) {
          lines[lines.length-1][day] = schedule;
        }
      }
    });

    return {
      category,
      lines,
    }
  })
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Calendar = styled.main`
  width: 100%;
  height: calc(100vh - 47.5px);
  display: flex;
`;

const CategorySide = styled.aside<{ theme: DefaultTheme }>`
  height: 100%;
  width: ${({ theme }) => theme.sizes.calendar.cellWidth + 3}px;
  border-right: 3px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: hidden;
`;

const ScheduleSide = styled.div<{ theme: DefaultTheme }>`
  width: calc(100% - ${({ theme }) => theme.sizes.calendar.cellWidth + 3}px);
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;

const CalendarHeader = styled.div<{ theme: DefaultTheme, $day_count: number }>`
  position: sticky;
  z-index: 1;
  width: ${({ theme, $day_count }) => String($day_count * (theme.sizes.calendar.cellWidth + ($day_count === 1 ? 0 : 1)))}px;
  top: 0;
  display: flex;
  justify-content: flex-start;
  height: 2.5rem;
  font-size: .75rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CalendarBody = styled.div<{ theme: DefaultTheme, $day_count: number }>`
  width: ${({ theme, $day_count }) => $day_count * (theme.sizes.calendar.cellWidth + ($day_count === 1 ? 0 : 1))}px;
  position: relative;
`;

const DivideLines = styled.div<{ theme: DefaultTheme, $day_count: number }>`
  position: absolute;
  left: 0;
  top: -2px;
  width: ${({ theme, $day_count }) => $day_count * (theme.sizes.calendar.cellWidth + 1)}px;
  height: calc(100% + 2px);
  display: flex;
`;

const DivideLine = styled.div<{ theme: DefaultTheme }>`
  width: ${({ theme }) => theme.sizes.calendar.cellWidth + 1}px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export default function Home() {
  const [categoryToRenderList, setCategoryToRenderList] = useState<CategoryToRender[]>([]);

  const categoryBody = useRef<HTMLDivElement>(null);
  const scheduleBody = useRef<HTMLDivElement>(null);

  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const calendarHeaderItems = useMemo(() => {
    let dayOfTheWeek = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

    return Array.from({length: lastDayOfMonth}, ((v, i) => i+1)).map(d => {
      const result = `${d}(${dayOfTheWeeks[dayOfTheWeek]})`;

      dayOfTheWeek++;
      if(dayOfTheWeek >= 7) dayOfTheWeek = 0;

      return result;
    } )

    // TODO 월 선택 추가 시 월에 따라 달라져야함
  }, [now]);

  useEffect(() => {
    console.log('useEffect');
    const categorySideBody = categoryBody.current!;
    const scheduleSideBody = scheduleBody.current!;
    scheduleSideBody.addEventListener('scroll', () => {
      console.log('scroll');
      categorySideBody.scrollTop = scheduleSideBody.scrollTop;
    });

    // 데이터를 가져와서 렌더링 데이터로 수정 후 저장
    // 임시로 가짜 데이터 사용
    setCategoryToRenderList(toRenderingData(calendarDummyData.categoryList, lastDayOfMonth));
    // TODO 월 선택 추가 시 월에 따라 달라져야함
  }, []);

  return (
    <Container>
      <Header />
      <Calendar>
        <CategorySide ref={categoryBody}>
          <CalendarHeader $day_count={1}>
            <Cell isCategory>
              카테고리 관리
            </Cell>
          </CalendarHeader>
          <CalendarBody $day_count={1}>
            {categoryToRenderList.map(categoryToRender => (
              <CategoryCell key={categoryToRender.category.id} category={categoryToRender.category} lineCount={categoryToRender.lines.length} />
            ))}
          </CalendarBody>
        </CategorySide>
        <ScheduleSide  ref={scheduleBody}>
          <CalendarHeader $day_count={lastDayOfMonth}>
            {calendarHeaderItems.map((headerItem => (
              <Cell key={headerItem}>
                {headerItem}
              </Cell>
            )))}  
          </CalendarHeader>
          <CalendarBody $day_count={lastDayOfMonth}>
            <DivideLines $day_count={lastDayOfMonth}>
              {Array.from({length: lastDayOfMonth}, () => null).map((_, i) => (
                <DivideLine key={`div${i}`}/>
              ))}
            </DivideLines>
            {categoryToRenderList.map(categoryToRender => (
              <ScheduleLine key={`schedule-${categoryToRender.category.id}`} categoryToRender={categoryToRender} />
            ))}
          </CalendarBody>
        </ScheduleSide>

      </Calendar>
    </Container>
  );
}
