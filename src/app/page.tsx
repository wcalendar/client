'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderCell from './HeaderCell';
import CategoryCell from './CategoryCell';
import ScheduleLine from './ScheduleLine';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import time from '@/lib/time';
import { NewScheduleModalProps } from '../components/common/new-schedule-modal/NewScheduleModal';
import { ScheduleModalProps } from '@/components/common/schedule-modal/ScheduleModal';
import { useRouter } from 'next/navigation';
import { CategoryModalInfo, NewScheduleModalInfo, ScheduleModalInfo, ScheduleToRender } from '@/types';
import { CategoryModalProps } from '@/components/common/category-modal/CategoryModal';
import Spinnable from '@/components/common/spinner/Spinnable';
import useDragMove from '@/hooks/useDragMove';
import { useModal } from '@/providers/ModalProvider/useModal';
import usePriorities from './usePriorities';
import PriorityList from './PriorityList';
import useDev from '@/hooks/useDev';
import { useCurrentDate } from '@/providers/CurrentDateProvider/useCurrentDate';
import useCalendar from './useCalendar';
import useCalendarData from '@/swr/useCalendarData';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];
const prioritiesSize = 3;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  
  --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};
  --category-cell-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.desktop};
  --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.desktop};
  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};
  --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.tablet};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.tablet};
    --category-cell-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.tablet};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.tablet};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.tablet};
    --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.mobile};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.mobile};
    --category-cell-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.mobile};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.mobile};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.mobile};
    --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.mobile};
  }
`;

const Calendar = styled.main`
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
  position: relative;
`;

const CategorySide = styled.aside`
  position: relative;
  height: 100%;
  width: calc(var(--category-cell-width) + 3px);
  border-right: 3px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: hidden;
`;

const ScheduleSide = styled.div`
  position: relative;
  width: calc(100% - (var(--category-cell-width) + 3px));
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;

const CalendarHeader = styled.div.withConfig({
  shouldForwardProp: p => !['dayCount'].includes(p),
})<{ dayCount: number }>`
  position: sticky;
  z-index: 1;
  width: calc(${({ dayCount }) => dayCount === 1 ?
  `var(--category-cell-width)` :
  `${dayCount} * (var(--cell-width) + ${dayCount === 1 ? 0 : 1}px)`});
  top: 0;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 2.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 3px solid ${({ theme }) => theme.colors.lightGray};
`;

const PrioritySection = styled.div.withConfig({
  shouldForwardProp: p => !['priorityCount'].includes(p),
})<{ priorityCount: number }>`
  width: 100%;
  height: calc(((var(--cell-height) + var(--line-gap)) * ${({ priorityCount }) => priorityCount + 1}) + 3px);
  position: relative;
  background: ${({ theme }) => theme.colors.lightBlue};
  border-bottom: 3px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  transition: height .25s ease;
  overflow: visible;
`;

const PriorityLabel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .75rem;
  font-weight: bold;
  user-select: none;
`;

const PriorityTip = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 0;
  color: ${({ theme }) => theme.colors.blue};
`;

const CalendarBody = styled.div.withConfig({
  shouldForwardProp: p => !['dayCount', 'isMoveMode'].includes(p),
})<{ dayCount: number, isMoveMode: number, }>`
  width: calc(${({ dayCount }) => dayCount === 1 ?
  `var(--category-cell-width)` :
  `${dayCount} * (var(--cell-width) + ${dayCount === 1 ? 0 : 1}px)`});
  min-height: ${({ dayCount }) => dayCount === 1 ? '100%' : 'calc(100vh - 4.375rem - 2.5rem)'};
  padding-top: var(--line-gap);
  position: relative;
  ${({ isMoveMode }) => isMoveMode ? 'cursor: grab;' : ''}
`;

const SettingCategoryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0 0.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 10px;
  cursor: pointer;

  font-size: 0.75rem;
  font-weight: bold;
  color: white;
`;

const DivideLines = styled.div.withConfig({
  shouldForwardProp: p => !['dayCount'].includes(p),
})<{ dayCount: number }>`
  position: absolute;
  left: 0;
  top: -2px;
  width: calc(${({ dayCount }) => `${dayCount} * (var(--cell-width) + 1px)`});
  height: calc(100% + 2px);
  display: flex;
`;

const DivideLine = styled.div`
  width: calc(var(--cell-width) + 1px);
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const AddScheduleButton = styled.button.withConfig({
  shouldForwardProp: p => !['isOpen'].includes(p),
})<{ isOpen: string }>`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 3.375rem;
  height: 3.375rem;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: transform 0.25s ease;
  transform: rotate(${({ isOpen }) => (isOpen === 'true' ? '45' : '0')}deg);
`;

const DragImage = styled.div`
  position: fixed;
  display: inline;
  pointer-events: none;
  width: auto;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  z-index: 20;
  background: white;
  padding: 0 .25rem;
`;

export default function Home() {
  const { isDev } = useDev();
  const { modals, addModal, closeModal } = useModal();

  const { currentDate } = useCurrentDate();

  const {
    categoryToRenderList, prioritiesByDay,
    setCategoryToRenderList, setPrioritiesByDay,
  } = useCalendar();

  const { calendarData, isCalendarDataLoading: isCalendarDateLoading, mutateCalendarData } = useCalendarData();

  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState(-1);
  
  const categoryBody = useRef<HTMLDivElement>(null);
  const scheduleBody = useRef<HTMLDivElement>(null);
  const [isMoveMode, onMouseDown, onMouseUp, onMouseMove] = useDragMove<HTMLDivElement>(scheduleBody);
  
  const daysInMonth = currentDate.daysInMonth();
  const calendarHeaderItems = useMemo(() => {
    let dayOfTheWeek = time.new(currentDate.year(), currentDate.month(), 1).day();

    return Array.from({ length: daysInMonth }, (v, i) => i + 1).map(d => {
      const result = `${d}(${dayOfTheWeeks[dayOfTheWeek]})`;

      dayOfTheWeek++;
      if (dayOfTheWeek >= 7) dayOfTheWeek = 0;

      return result;
    });
  }, [currentDate]);

  useEffect(() => {
    const categorySideBody = categoryBody.current!;
    const scheduleSideBody = scheduleBody.current!;
    const handleScheduleSideScroll = () => {
      categorySideBody.scrollTop = scheduleSideBody.scrollTop;
    };
    scheduleSideBody.addEventListener('scroll', handleScheduleSideScroll);

    return () => {
      scheduleSideBody.removeEventListener('scroll', handleScheduleSideScroll);
    }
  }, []);

  useEffect(() => {
    // droppable 영역 외에 drop하면 dragImage가 제자리로 돌아가는 효과 삭제
    const handleOutsideDragOver = (e: globalThis.DragEvent) => {
      e.preventDefault();
    }

    document.addEventListener('dragover', handleOutsideDragOver);

    return () => {
      document.removeEventListener('dragover', handleOutsideDragOver);
    }
  }, []);

  useEffect(() => {
    const firstLogin = localStorage.getItem('first_login');

    if((firstLogin && firstLogin === 'true') || isDev()) {
      addModal({ key: 'tutorial', modalProps: {}});
      localStorage.removeItem('first_login');
    }
  }, []);

  const handleCellMouseOver = (categoryIdx: number) => {
    setHoveredCategoryIdx(categoryIdx);
  };

  const handleCellMouseOut = () => {
    setHoveredCategoryIdx(-1);
  }

  const router = useRouter();
  const handleMoveCategoryPage = () => {
    router.push('/category');
  };

  const handleScheduleClick = useCallback((newScheduleModalInfo: ScheduleModalInfo) => {
    const props: ScheduleModalProps = {
      scheduleModalInfo: newScheduleModalInfo,
      onUpdateClick: handleUpdateScheduleClick,
    }
    
    addModal({ key: 'schedule', modalProps: props });
  }, []);

  const handleCategoryClick = useCallback((newCategoryModalInfo: CategoryModalInfo) => {
    const props: CategoryModalProps = {
      categoryModalInfo: newCategoryModalInfo,
    };
    
    addModal({ key: 'category', modalProps: props });
  }, []);

  const openNewScheduleModal = useCallback((newScheduleModalInfo: NewScheduleModalInfo) => {
    const props: NewScheduleModalProps = {
      newScheduleModalInfo,
    }

    addModal({ key: 'newSchedule', modalProps: props });
  }, []);

  const handleUpdateScheduleClick = useCallback((schedule: ScheduleToRender) => {
    openNewScheduleModal({ updateScheduleInfo: { schedule } });
  }, [openNewScheduleModal]);

  const handleOpenNewScheduleModal = () => {
    openNewScheduleModal({});
  };

  const handleCellClick = useCallback((categoryId: string, day: number) => {
    const y = currentDate.year();
    const m = currentDate.month();

    for(const c1 of calendarData!) {
      if(c1.categoryId === categoryId) {
        openNewScheduleModal({ fixedCategoryInfo: { categoryId: c1.categoryId, date: time.new(y, m, day) } });
        return;
      }

      for(const c2 of c1.children) {
        if(c2.categoryId === categoryId) {
          openNewScheduleModal({ fixedCategoryInfo: { categoryId: c2.categoryId, date: time.new(y, m, day) } });
          return;
        } 

        for(const c3 of c2.children) {
          if(c3.categoryId === categoryId) {
            openNewScheduleModal({ fixedCategoryInfo: { categoryId: c3.categoryId, date: time.new(y, m, day) } });
            return;
          } 
        }
      }
    }

    alert('존재하지 않는 카테고리입니다.');
  }, [currentDate, calendarData, openNewScheduleModal]);

  const {
    draggedPriorityX, draggedPriorityY, draggedPriority, openedDay,
    handlePriorityListOpen,
    handlePriorityClick,
    handlePriorityItemDrag,
    handlePriorityItemDragEnd,
    handlePriorityItemDrop,
  } = usePriorities(categoryToRenderList, prioritiesByDay, setPrioritiesByDay, handleScheduleClick, );

  return (
    <Container>
      <Calendar>
        <Spinnable isLoading={isCalendarDateLoading}>
          <CategorySide ref={categoryBody}>
            <CalendarHeader dayCount={1}>
              <HeaderSection>
                <HeaderCell isCategory>
                  <SettingCategoryButton onClick={handleMoveCategoryPage}>
                    카테고리 관리
                  </SettingCategoryButton>
                </HeaderCell>
              </HeaderSection>
              <PrioritySection priorityCount={prioritiesSize}>
                <PriorityLabel>
                  일정 우선순위
                  <PriorityTip>{`* Drag&Drop으로 순서 변경이 가능`}</PriorityTip>
                </PriorityLabel>
              </PrioritySection>
            </CalendarHeader>
            <CalendarBody dayCount={1} isMoveMode={0}>
              {categoryToRenderList.map((categoryToRender, i) => (
                <CategoryCell
                  key={categoryToRender.category.id}
                  category={categoryToRender.category}
                  lineCount={categoryToRender.lines.length}
                  onCategoryClick={handleCategoryClick}
                  isHovered={hoveredCategoryIdx === i}
                />
              ))}
            </CalendarBody>
          </CategorySide>
          <ScheduleSide ref={scheduleBody} onMouseMove={(e) => {if(isMoveMode) e.preventDefault()} }>
            <CalendarHeader dayCount={daysInMonth}>
              <HeaderSection>
                {calendarHeaderItems.map(headerItem => (
                  <HeaderCell key={headerItem}>{headerItem}</HeaderCell>
                ))}
              </HeaderSection>
              <PrioritySection priorityCount={prioritiesSize}>
                <DivideLines dayCount={daysInMonth}>
                  {Array.from({ length: daysInMonth }, () => null).map(
                    (_, i) => (
                      <DivideLine key={`div${i}`} />
                    ),
                  )}
                </DivideLines>
                {prioritiesByDay.map((priorities, i) => (
                  <PriorityList
                    key={`pl-${i}`}
                    priorities={priorities}
                    prioritiesSize={prioritiesSize}
                    isOpened={openedDay === i+1}
                    onPriorityListOpen={handlePriorityListOpen}
                    onPriorityItemClick={handlePriorityClick}
                    onPriorityItemDrag={handlePriorityItemDrag}
                    onPriorityItemDragEnd={handlePriorityItemDragEnd}
                    onPriorityItemDrop={handlePriorityItemDrop}
                    day={i}
                  />
                ))}
                {draggedPriority && (<DragImage style={{ left: draggedPriorityX+20, top: draggedPriorityY+10, }} >{draggedPriority.content}</DragImage>)}
              </PrioritySection>
            </CalendarHeader>
            <CalendarBody dayCount={daysInMonth} isMoveMode={isMoveMode ? 1 : 0}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseUp}
            >
              <DivideLines dayCount={daysInMonth}>
                {Array.from({ length: daysInMonth }, () => null).map(
                  (_, i) => (
                    <DivideLine key={`div${i}`} />
                  ),
                )}
              </DivideLines>
              {categoryToRenderList.map((categoryToRender, i) => (
                <ScheduleLine
                  key={`schedule-${categoryToRender.category.id}`}
                  categoryToRender={categoryToRender}
                  onScheduleClick={handleScheduleClick}
                  onCellMouseOver={handleCellMouseOver}
                  onCellMouseOut={handleCellMouseOut}
                  onCellClick={handleCellClick}
                  categoryIdx={i}
                />
              ))}
            </CalendarBody>
          </ScheduleSide>
        </Spinnable>
      </Calendar>
      <AddScheduleButton
        isOpen={modals[0]?.key === 'newSchedule' ? 'true' : 'false'}
        onClick={handleOpenNewScheduleModal}
      >
        <Icon path={mdiPlus} color="white" />
      </AddScheduleButton>
    </Container>
  );
}
