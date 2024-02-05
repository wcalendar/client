import { apis } from "@/lib/apis";
import time from "@/lib/time";
import { Category, CategoryDto, CategoryToRender, ErrorRes, Priority, ScheduleDto, ScheduleToRender } from "@/types";
import { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

export default function useCalendarData(
  selectedDate: Dayjs,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  const daysInMonth = useMemo(() => selectedDate.daysInMonth(), [selectedDate]);
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [categoryToRenderList, setCategoryToRenderList] = useState<CategoryToRender[]>([]);
  const [prioritiesByDay, setPrioritiesByDay] = useState<Priority[][]>([]);

  const router = useRouter();

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
    let startDate: Dayjs | undefined;
    let lastSchedule: ScheduleDto | undefined;
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
        
        if(startDate && lastSchedule) {
          rangeSchedules.push({
            id: lastSchedule.scheduleId,
            groupCode: lastSchedule.scheduleGroupCode,
            categoryId: lastSchedule.categoryId,
            content: lastSchedule.scheduleContent,
            startDate,
            endDate: time.fromString(lastSchedule.scheduleDate),
            isFinished: lastSchedule.isFinished,
            isPriority: lastSchedule.isPriority,
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
        isFinished: lastSchedule.isFinished,
        isPriority: lastSchedule.isPriority,
      });
    }

    // 일정 시작 날짜가 빠른 순서대로 -> 날짜가 같으면 기간이 더 긴 일정이 우선
    rangeSchedules.sort((a, b) => a.startDate.date() === b.startDate.date() ? (b.endDate.date() - b.startDate.date()) - (a.endDate.date() - a.startDate.date()) : a.startDate.date() - b.startDate.date());

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

  const getCategoryList = async (y: number, m: number) => {
    try {
      const response = await apis.getCalendarData(y, m);

      setCategoryList(response.resultBody);

      setLoading(false);
    } catch(error) {
      const e = error as AxiosError<ErrorRes>;
      if(e.response) {
        if(e.response.status === 401 || e.response.status === 404) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/login');
        }
      } else {
        alert('문제가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    setLoading(true);

    const y = selectedDate.year();
    const m = selectedDate.month();
    getCategoryList(y, m);
  }, [selectedDate]);

  useEffect(() => {
    toRenderingData(categoryList);
  }, [categoryList]);

  return { categoryList, categoryToRenderList, prioritiesByDay, setCategoryList, setCategoryToRenderList, setPrioritiesByDay, getCategoryList, };
}