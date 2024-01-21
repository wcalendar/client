import { calendarDummyData } from "@/dummies/calendar";
import time from "@/lib/time";
import { CalendarCategory, CategoryDto, CategoryToRender, Priority, ScheduleDto, ScheduleToRender } from "@/types";
import { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useCalendarData(selectedDate: Dayjs) {
  const daysInMonth = useMemo(() => selectedDate.daysInMonth(), [selectedDate]);
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [categoryToRenderList, setCategoryToRenderList] = useState<CategoryToRender[]>([]);
  const [prioritiesByDay, setPrioritiesByDay] = useState<Priority[][]>([]);

  // CategoryDto를 CategoryToRender 타입으로 변환해주는 함수
  const toCategoryRender = useCallback((category: CategoryDto, newPriorities: Priority[][]): CategoryToRender => {
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
    lines.push(Array.from({length: daysInMonth}, () => null));

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
        lines.push(Array.from({length: daysInMonth}, () => null));
        for (let day = startDate.date() - 1; day <= endDate.date() - 1; day++) {
          lines[lines.length - 1][day] = schedule;
        }
      }
    });

    return {
      category: newCategory,
      lines,
    };
  }, [daysInMonth]);

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
      newCategoryToRenderList.push(toCategoryRender(c0, newPriorities));

      if(c0.children.length > 0) {
        c0.children.forEach(c1 => {
          newCategoryToRenderList.push(toCategoryRender(c1, newPriorities));

          if(c1.children.length > 0) {
            c1.children.forEach(c2 => {
              newCategoryToRenderList.push(toCategoryRender(c2, newPriorities));
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
    const month = selectedDate.month();
    setCategoryList(calendarDummyData[month].resultBody);
  }, [selectedDate]);

  useEffect(() => {
    toRenderingData(categoryList);
  }, [categoryList]);

  return { categoryList, categoryToRenderList, prioritiesByDay, setCategoryList, setCategoryToRenderList, setPrioritiesByDay };
}