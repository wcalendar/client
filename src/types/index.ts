import { Dayjs } from "dayjs";

export type CategoryColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export type Category = {
  categoryId?: number;
  categoryName: string;
  categoryColor: CategoryColor;
  categoryLevel: number;
  categoryDescription?: string;
  categoryVisible: boolean;
  categoryStartDate: string;
  categoryEndDate: string;
  children?: Category;
};

/**
 * 
 */

// 응답 데이터 형식
export type ResDto<T> = {
  resultMessage: string;
  resultBody: T;
}

// 서버에서 오는 카테고리 데이터
// GET /api/schedules/{year}/{month}
export type CategoryDto = {
  categoryId: number;
  categoryName: string;
  categoryLevel: number;
  categoryColor: CategoryColor;
  categoryStartDate: string;
  categoryEndDate: string;
  categoryDescription: string;
  categoryVisible: boolean;
  schedules: ScheduleDto[];
  children: CategoryDto[];
}

// 캘린더에 렌더링하기 쉽게 가공한 카테고리 데이터
export interface CalendarCategory {
  id: number;
  name: string;
  level: number;
  color: CategoryColor;
  startDate: Dayjs;
  endDate: Dayjs;
  description: string;
  isVisible: boolean;
  schedules: ScheduleToRender[];
}

// 서버에서 오는 일정 데이터
// GET /api/schedules/{year}/{month}
export type ScheduleDto = {
  scheduleId: number;
  scheduleGroupCode: number;
  categoryId: number;
  scheduleContent: string;
  scheduleDate: string;
  schedulePriority: number;
  finished: boolean;
}

// 캘린더에 렌더링하기 위한 카테고리 데이터
export type CategoryToRender = {
  category: CalendarCategory;
  lines: (ScheduleToRender | undefined)[][];
};

// 캘린더에 렌더링하기 위한 일정 데이터
export type ScheduleToRender = {
  id: number;
  groupCode: number;
  categoryId: number;
  content: string;
  isFinished: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

// 우선순위를 렌더링하기 위한 데이터
export type Priority = {
  categoryId: number;
  scheduleId: number;
  groupCode: number;
  day: number;
  priority: number;
  isFinished: boolean;
  color: CategoryColor;
  level: number;
  content: string;
};

// 새 일정을 만들때 보내는 데이터
// POST /api/schedules
export type NewScheduleDto = {
  scheduleContent: string,
  scheduleStartDate: string,
  scheduleEndDate: string,
  categoryId: number,
  schedulePriority: number,
  isDuration: boolean,
  isPriority: boolean,
}

// ScheduleModal (일정 클릭했을 때) 데이터
export type ScheduleModalInfo = {
  x: number,
  y: number,
  schedule: ScheduleToRender,
}