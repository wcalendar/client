import time from "@/lib/time";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import useCalendarData from "@/swr/useCalendarData";
import { Category, CategoryDto, CategoryToRender, Priority, ScheduleToRender } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useCalendar() {
  const { currentDate } = useCurrentDate();
  const daysInMonth = useMemo(() => currentDate.daysInMonth(), [currentDate]);

  const [categoryToRenderList, setCategoryToRenderList] = useState<CategoryToRender[]>([]);
  const [prioritiesByDay, setPrioritiesByDay] = useState<Priority[][]>([]);

  const { calendarData } = useCalendarData();

  // CategoryDto를 CategoryToRender 타입으로 변환해주는 함수
  const toCategoryRender = useCallback((parentId: string | null, category: CategoryDto, newPriorities: Priority[][]): CategoryToRender => {
    const newCategory: Category = {
      id: category.categoryId,
      name: category.categoryName,
      level: category.categoryLevel,
      color: category.categoryColor,
      startDate: time.fromString(category.categoryStartDate),
      endDate: time.fromString(category.categoryEndDate),
      description: category.categoryDescription,
      isVisible: category.categoryVisible,
      parentId,
      schedules: [],
    };
    const lines: (ScheduleToRender | null)[][] = [];
    lines.push(Array.from({length: daysInMonth}, () => null));

    const rangeSchedules: ScheduleToRender[] = [];

    let scheduleGroupCode = '-1';
    category.schedules.forEach(schedule => {
      const date = time.fromString(schedule.scheduleDate);
      if(schedule.isPriority) {
        newPriorities[date.date()-1].push({
          scheduleId: schedule.scheduleId,
          categoryId: category.categoryId,
          groupCode: schedule.scheduleGroupCode,
          date: date,
          priority: schedule.schedulePriority,
          isFinished: schedule.isFinished,
          color: category.categoryColor,
          level: category.categoryLevel,
          content: schedule.scheduleContent,
        });
      }

      if(schedule.scheduleGroupCode !== scheduleGroupCode) {
        scheduleGroupCode = schedule.scheduleGroupCode;

        const startDate = time.fromString(schedule.scheduleStartDate);
        const endDate = time.fromString(schedule.scheduleEndDate);
        const startDayToRender = startDate.year() < currentDate.year() ? 1 : (startDate.month() < currentDate.month() ? 1 : startDate.date());
        const endDayToRender = endDate.year() > currentDate.year() ? currentDate.daysInMonth() : (endDate.month() > currentDate.month() ? currentDate.daysInMonth() : endDate.date());

        rangeSchedules.push({
          id: schedule.scheduleId,
          groupCode: schedule.scheduleGroupCode,
          categoryId: schedule.categoryId,
          content: schedule.scheduleContent,
          startDate,
          endDate,
          isFinished: schedule.isFinished,
          isPriority: schedule.isPriority,
          startDayToRender,
          endDayToRender,
        });
      }
    });

    // 일정 시작 날짜가 빠른 순서대로 -> 날짜가 같으면 기간이 더 긴 일정이 우선
    rangeSchedules.sort((a, b) => a.startDayToRender === b.startDayToRender ? (b.endDayToRender - b.startDayToRender) - (a.endDayToRender - a.startDayToRender) : a.startDayToRender - b.startDayToRender);

    rangeSchedules.forEach(schedule => {
      const lineCount = lines.length;
      const {startDayToRender, endDayToRender} = schedule;
      newCategory.schedules.push(schedule);

      let isAllocated = false;
      for (let i = 0; i < lineCount; i++) {
        // 해당 라인에 이미 할당된 일정이 있다면 다음 라인으로
        if (lines[i][startDayToRender - 1]) continue;

        // 할당된 일정이 없다면 일정 할당
        isAllocated = true;
        for (let day = startDayToRender - 1; day <= endDayToRender - 1; day++) {
          lines[i][day] = schedule;
        }
        break;
      }

      // 모든 라인에 할당되어 있으면 새 라인 생성하고 할당
      if (!isAllocated) {
        lines.push(Array.from({length: daysInMonth}, () => null));
        for (let day = startDayToRender - 1; day <= endDayToRender - 1; day++) {
          lines[lines.length - 1][day] = schedule;
        }
      }
    });

    return {
      category: newCategory,
      lines,
    };
  }, [daysInMonth, currentDate]);

  /**
   * 서버에서 받은 카테고리 데이터를 화면에 렌더링하기 쉽게 다듬어주는 함수
   * @param categoryList 서버로부터 받은 카테고리 데이터
   * @param lastDayInMonth 현재 월의 마지막 일
   * @returns
   */
  const toRenderingData = useCallback((newCategoryList: CategoryDto[]) => {
    const newCategoryToRenderList: CategoryToRender[] = [];
    const newPriorities: Priority[][] = Array.from({length: daysInMonth}, () => []);

    newCategoryList.forEach(c0 => {
      newCategoryToRenderList.push(toCategoryRender(null, c0, newPriorities));

      if(c0.children.length > 0) {
        c0.children.forEach(c1 => {
          newCategoryToRenderList.push(toCategoryRender(c0.categoryId, c1, newPriorities));

          if(c1.children.length > 0) {
            c1.children.forEach(c2 => {
              newCategoryToRenderList.push(toCategoryRender(c1.categoryId, c2, newPriorities));
            })
          }
        })
      }
    })

    newPriorities.forEach(priorityList => priorityList.sort((a, b) => a.priority - b.priority));
    setPrioritiesByDay(newPriorities);
    setCategoryToRenderList(newCategoryToRenderList);
  }, [daysInMonth]);

  useEffect(() => {
    if(calendarData) toRenderingData(calendarData);
  }, [calendarData]);

  return { categoryToRenderList, prioritiesByDay, setCategoryToRenderList, setPrioritiesByDay, };
}