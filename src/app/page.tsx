'use client';

import Header from '@/components/common/Header';
import { calendarDummyData } from '@/dummies/calendar';
import { DragEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderCell from '../components/calendar/HeaderCell';
import CategoryCell from '../components/calendar/CategoryCell';
import ScheduleLine from '../components/calendar/ScheduleLine';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import time from '@/lib/time';
import { Dayjs } from 'dayjs';
import { NewScheduleModalProps } from '../components/calendar/NewScheduleModal';
import { ScheduleModalProps } from '@/components/common/schedule-modal/ScheduleModal';
import { useRouter } from 'next/navigation';
import PriorityList from '../components/calendar/PriorityList';
import { CalendarCategory, CategoryDto, CategoryModalInfo, CategoryToRender, ErrorRes, NewScheduleDto, NewScheduleModalInfo, Priority, ScheduleDto, ScheduleModalInfo, ScheduleToRender } from '@/types';
import { CategoryModalProps } from '@/components/common/category-modal/CategoryModal';
import Spinnable from '@/components/common/spinner/Spinnable';
import { apis, authAPI } from '@/lib/apis';
import useDragMove from '@/hooks/useDragMove';
import { useModal } from '@/providers/ModalProvider/useModal';
import { AxiosError } from 'axios';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];
const prioritiesSize = 3;

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};
  --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.desktop};
  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};
  --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.tablet};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.tablet};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.tablet};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.tablet};
    --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.mobile};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.mobile};
    --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.mobile};
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.mobile};
    --priority-count: ${({ theme }) => theme.sizes.calendar.PriorityCount.mobile};
  }
`;

const Calendar = styled.main`
  width: 100%;
  height: calc(100vh - 47.5px);
  display: flex;
  position: relative;
`;

const CategorySide = styled.aside`
  position: relative;
  // z-index: 2;
  height: 100%;
  width: calc(var(--cell-width) + 3px);
  border-right: 3px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: hidden;
`;

const ScheduleSide = styled.div`
  position: relative;
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

const PrioritySection = styled.div<{ $priority_count: number }>`
  width: 100%;
  height: calc(((var(--cell-height) + var(--line-gap)) * ${({ $priority_count }) => $priority_count + 1}) + 3px);
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

const CalendarBody = styled.div<{ $day_count: number, $is_move_mode: number, }>`
  width: calc(${({ $day_count }) => `${$day_count} * (var(--cell-width) + ${$day_count === 1 ? 0 : 1}px)`});
  min-height: calc(100vh - 47.5px - 2.5rem);
  padding-top: var(--line-gap);
  position: relative;
  ${({ $is_move_mode }) => $is_move_mode ? 'cursor: grab;' : ''}
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
  const { modals, addModal, closeModal } = useModal();

  const [selectedDate, setSelectedDate] = useState(time.now());

  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [categoryToRenderList, setCategoryToRenderList] = useState<
    CategoryToRender[]
  >([]);
  const [prioritiesByDay, setPrioritiesByDay] = useState<Priority[][]>([]);

  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState(-1);
  const [draggedPriority, setDraggedPriority] = useState<Priority | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [isLoading, setLoading] = useState(false);
  
  const categoryBody = useRef<HTMLDivElement>(null);
  const scheduleBody = useRef<HTMLDivElement>(null);
  const [isMoveMode, onMouseDown, onMouseUp, onMouseMove] = useDragMove<HTMLDivElement>(scheduleBody);
  
  const daysInMonth = selectedDate.daysInMonth();
  const calendarHeaderItems = useMemo(() => {
    let dayOfTheWeek = time.new(selectedDate.year(), selectedDate.month(), 1).day();

    return Array.from({ length: daysInMonth }, (v, i) => i + 1).map(d => {
      const result = `${d}(${dayOfTheWeeks[dayOfTheWeek]})`;

      dayOfTheWeek++;
      if (dayOfTheWeek >= 7) dayOfTheWeek = 0;

      return result;
    });
  }, [selectedDate]);

  /**
   * 서버에서 받은 카테고리 데이터를 화면에 렌더링하기 쉽게 다듬어주는 함수
   * @param categoryList 서버로부터 받은 카테고리 데이터
   * @param lastDayInMonth 현재 월의 마지막 일
   * @returns
   */
  const toRenderingData = (
    categoryList: CategoryDto[],
    lastDayInMonth: number,
  ) => {
    const newCategoryToRenderList: CategoryToRender[] = [];
    const newPriorities: Priority[][] = Array.from({length: lastDayInMonth}, () => []);

    const toCategoryRender = (category: CategoryDto): CategoryToRender => {
      const newCategory: CalendarCategory = {
        id: category.categoryId,
        name: category.categoryName,
        level: category.categoryLevel,
        color: category.categoryColor,
        startDate: time.fromString(category.categoryStartDate),
        endDate: time.fromString(category.categoryEndDate),
        description: category.categoryDescription,
        isVisible: category.categoryVisible,
        schedules: [],
      };
      const lines: (ScheduleToRender | null)[][] = [];
      lines.push(Array.from({length: lastDayInMonth}, () => null));

      const rangeSchedules: ScheduleToRender[] = [];

      let scheduleGroupCode = -1;
      let startDate: Dayjs | undefined;
      let lastSchedule: ScheduleDto | undefined;
      category.schedules.forEach(schedule => {
        const date = time.fromString(schedule.scheduleDate);
        newPriorities[date.date()-1].push({
          scheduleId: schedule.scheduleId,
          categoryId: category.categoryId,
          groupCode: schedule.scheduleGroupCode,
          day: date.date(),
          priority: schedule.schedulePriority,
          isFinished: schedule.finished,
          color: category.categoryColor,
          level: category.categoryLevel,
          content: schedule.scheduleContent,
        });

        if(schedule.scheduleGroupCode !== scheduleGroupCode) {
          scheduleGroupCode = schedule.scheduleGroupCode;
          
          if(startDate && lastSchedule) {
            rangeSchedules.push({
              id: lastSchedule.scheduleId,
              groupCode: lastSchedule.scheduleGroupCode,
              categoryId: lastSchedule.categoryId,
              content: lastSchedule.scheduleContent,
              startDate,
              endDate: time.fromString(lastSchedule.scheduleDate),
              isFinished: lastSchedule.finished,
            });
          }

          startDate = date;
        }

        lastSchedule = schedule;
      });
      if(startDate && lastSchedule) {
        rangeSchedules.push({
          id: lastSchedule.scheduleId,
          categoryId: lastSchedule.categoryId,
          groupCode: lastSchedule.scheduleGroupCode,
          content: lastSchedule.scheduleContent,
          startDate,
          endDate: time.fromString(lastSchedule.scheduleDate),
          isFinished: lastSchedule.finished,
        });
      }

      rangeSchedules.forEach(schedule => {
        const lineCount = lines.length;
        const {startDate, endDate} = schedule;
        newCategory.schedules.push(schedule);

        let isAllocated = false;
        for (let i = 0; i < lineCount; i++) {
          // 해당 라인에 이미 할당된 일정이 있다면 다음 라인으로
          if (lines[i][startDate.date() - 1]) continue;

          // 할당된 일정이 없다면 일정 할당
          isAllocated = true;
          for (let day = startDate.date() - 1; day <= endDate.date() - 1; day++) {
            lines[i][day] = schedule;
          }
          break;
        }

        // 모든 라인에 할당되어 있으면 새 라인 생성하고 할당
        if (!isAllocated) {
          lines.push(Array.from({length: lastDayInMonth}, () => null));
          for (let day = startDate.date() - 1; day <= endDate.date() - 1; day++) {
            lines[lines.length - 1][day] = schedule;
          }
        }
      });

      return {
        category: newCategory,
        lines,
      };
    }

    categoryList.forEach(c0 => {
      newCategoryToRenderList.push(toCategoryRender(c0));

      if(c0.children.length > 0) {
        c0.children.forEach(c1 => {
          newCategoryToRenderList.push(toCategoryRender(c1));

          if(c1.children.length > 0) {
            c1.children.forEach(c2 => {
              newCategoryToRenderList.push(toCategoryRender(c2));
            })
          }
        })
      }
    })

    newPriorities.forEach(priorityList => priorityList.sort((a, b) => a.priority - b.priority));
    setPrioritiesByDay(newPriorities);
    setCategoryToRenderList(newCategoryToRenderList);
  };

  const getCategoryList = async (y: number, m: number) => {
    try {
      const response = await apis.getCalendarData(y, m);

      setCategoryList(response.resultBody);

      setLoading(false);
    } catch(error) {
      const e = error as AxiosError<ErrorRes>;
      if(e.response) {
        if(e.response.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/login');
        }
      } else {
        alert('문제가 발생했습니다.');
      }
    }
  };

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
    setLoading(true);

    const y = selectedDate.year();
    const m = selectedDate.month();
    getCategoryList(y, m);
  }, [selectedDate]);

  useEffect(() => {
    toRenderingData(categoryList, daysInMonth);
  }, [categoryList]);

  const handleCellMouseOver = (categoryIdx: number) => {
    setHoveredCategoryIdx(categoryIdx);
  };

  const handleCellMouseOut = () => {
    setHoveredCategoryIdx(-1);
  }

  const handleSelectedDateChange = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const handleScheduleCreate = useCallback(() => {
    setLoading(true);

    const y = selectedDate.year();
    const m = selectedDate.month();
    getCategoryList(y, m);

    closeModal();
  }, [selectedDate]);

  const router = useRouter();
  const handleMoveCategoryPage = () => {
    router.push('/category');
  };

  const handleScheduleFinish = useCallback((categoryId: number, groupCode: number) => {
    const newCategoryListToRender = [...categoryToRenderList];
    const category = newCategoryListToRender.find(c => c.category.id === categoryId);
    if(!category) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    let foundSchedule: ScheduleToRender | undefined;
    let isScheduleFound = false;
    for(const line of category.lines) {
      for(const schedule of line) {
        if(schedule && schedule.groupCode === groupCode) {
          isScheduleFound = true;
          foundSchedule = {...schedule};
          break;
        }
      }

      if(isScheduleFound) break;
    }
    if(!foundSchedule) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    const newIsFinished = !(foundSchedule.isFinished);
    foundSchedule.isFinished = newIsFinished;
    setCategoryToRenderList(newCategoryListToRender);

    // 우선순위
    const startDay = foundSchedule.startDate.date();
    const endDay = foundSchedule.endDate.date();
    const newPriorities = [...prioritiesByDay];
    for(let i=startDay; i<=endDay; i++) {
      for(let j=0; j<newPriorities[i-1].length; j++) {
        if(newPriorities[i-1][j].groupCode === groupCode) {
          newPriorities[i-1][j].isFinished = newIsFinished;
          break;
        }
      }
    }
    setPrioritiesByDay(newPriorities);
  }, [categoryToRenderList, daysInMonth, prioritiesByDay]);

  const handlePriorityClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: number, groupCode: number) => {
    const category = categoryToRenderList.find(c => c.category.id === categoryId)?.category;
    if(!category) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    const schedule = category.schedules.find(s => s.groupCode === groupCode);
    if(!schedule) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    const newScheduleModalInfo: ScheduleModalInfo = {
      x: e.clientX,
      y: e.clientY,
      schedule,
    };

    handleScheduleClick(newScheduleModalInfo);
  };
  
  const handlePriorityItemDrag = (newX: number, newY: number, priority: Priority) => {
    if(!draggedPriority) setDraggedPriority(priority);
    setX(newX);
    setY(newY);
  };
  
  const handlePriorityItemDragEnd = (e?: DragEvent<HTMLDivElement>) => {
    setDraggedPriority(null);

    const dragImage = document.getElementById('drag-image');
    if(dragImage) {
      dragImage.remove();
    }
  };

  const handlePriorityItemDrop = useCallback((day: number, draggableIdx: number, droppableIdx: number) => {
    const newPrioritiesByDay = [...prioritiesByDay];
    const priorities = newPrioritiesByDay[day];

    const targetIdx = droppableIdx > draggableIdx ? droppableIdx-1 : droppableIdx;
    if(draggableIdx < targetIdx) {
      priorities[draggableIdx].priority = targetIdx;

      for(let i=draggableIdx+1; i<=targetIdx; i++) {
        (priorities[i].priority)--;
      }
    } else if(draggableIdx > targetIdx) {
      priorities[draggableIdx].priority = targetIdx;

      for(let i=targetIdx; i<draggableIdx; i++) {
        (priorities[i].priority)++;
      }
    } else return;

    priorities.sort((a, b) => a.priority - b.priority);

    setPrioritiesByDay(newPrioritiesByDay);

    handlePriorityItemDragEnd();
  }, [prioritiesByDay]);

  const handleScheduleClick = useCallback((newScheduleModalInfo: ScheduleModalInfo) => {
    const props: ScheduleModalProps = {
      scheduleModalInfo: newScheduleModalInfo,
      onScheduleFinish: handleScheduleFinish,
      onUpdateClick: handleUpdateScheduleClick,
    }
    
    addModal({ key: 'schedule', modalProps: props });
  }, [handleScheduleFinish]);

  const handleCategoryClick = useCallback((newCategoryModalInfo: CategoryModalInfo) => {
    const props: CategoryModalProps = {
      categoryModalInfo: newCategoryModalInfo,
    };
    
    addModal({ key: 'category', modalProps: props });
  }, []);

  const openNewScheduleModal = useCallback((newScheduleModalInfo: NewScheduleModalInfo) => {
    const props: NewScheduleModalProps = {
      newScheduleModalInfo,
      onScheduleCreate: handleScheduleCreate,
    }

    addModal({ key: 'newSchedule', modalProps: props })
  }, [handleScheduleCreate]);

  const handleUpdateScheduleClick = useCallback((schedule: ScheduleToRender) => {
    openNewScheduleModal({ schedule });
  }, [openNewScheduleModal]);

  const handleOpenNewScheduleModal = () => {
    openNewScheduleModal({});
  };

  const handleCellClick = useCallback((categoryId: number, day: number) => {
    const y = selectedDate.year();
    const m = selectedDate.month();

    for(const c1 of categoryList) {
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
  }, [openNewScheduleModal]);

  return (
    <Container>
      <Header date={selectedDate} onDateChange={handleSelectedDateChange} />
      <Calendar>
        <Spinnable isLoading={isLoading}>
          <CategorySide ref={categoryBody}>
            <CalendarHeader $day_count={1}>
              <HeaderSection>
                <HeaderCell isCategory>
                  <SettingCategoryButton onClick={handleMoveCategoryPage}>
                    카테고리 관리
                  </SettingCategoryButton>
                </HeaderCell>
              </HeaderSection>
              <PrioritySection $priority_count={prioritiesSize}>
                <PriorityLabel>
                  일정 우선순위
                  <PriorityTip>{`* Drag&Drop으로 순서 변경이 가능`}</PriorityTip>
                </PriorityLabel>
              </PrioritySection>
            </CalendarHeader>
            <CalendarBody $day_count={1} $is_move_mode={0}>
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
            <CalendarHeader $day_count={daysInMonth}>
              <HeaderSection>
                {calendarHeaderItems.map(headerItem => (
                  <HeaderCell key={headerItem}>{headerItem}</HeaderCell>
                ))}
              </HeaderSection>
              <PrioritySection $priority_count={prioritiesSize}>
                <DivideLines $day_count={daysInMonth}>
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
                    onPriorityItemClick={handlePriorityClick}
                    onPriorityItemDrag={handlePriorityItemDrag}
                    onPriorityItemDragEnd={handlePriorityItemDragEnd}
                    onPriorityItemDrop={handlePriorityItemDrop}
                    day={i}
                  />
                ))}
                {draggedPriority && (<DragImage style={{ left: x+20, top: y+10, }} >{draggedPriority.content}</DragImage>)}
              </PrioritySection>
            </CalendarHeader>
            <CalendarBody $day_count={daysInMonth} $is_move_mode={isMoveMode ? 1 : 0}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseUp}
            >
              <DivideLines $day_count={daysInMonth}>
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
        $isOpen={modals[0]?.key === 'newSchedule' ? 'true' : 'false'}
        onClick={handleOpenNewScheduleModal}
      >
        <Icon path={mdiPlus} color="white" />
      </AddScheduleButton>
    </Container>
  );
}
