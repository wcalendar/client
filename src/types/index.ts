import { NewScheduleModalProps } from "@/components/common/new-schedule-modal/NewScheduleModal";
import { CategoryModalProps } from "@/components/common/category-modal/CategoryModal";
import { ScheduleModalProps } from "@/components/common/schedule-modal/ScheduleModal";
import { SearchModalProps } from "@/components/common/search-modal/SearchModal";
import { Dayjs } from "dayjs";
import { TutorialModalProps } from "@/components/common/tutorial-modal/TutorialModal";

export type CategoryColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export type Device = 'mobile' | 'tablet' | 'desktop';
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
export interface Category {
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
  category: Category;
  lines: (ScheduleToRender | null)[][];
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

// 캘린더에서 카테고리 클릭했을 때 뜨는 모달 데이터
export type CategoryModalInfo = {
  x: number,
  y: number,
  category: Category,
}

// 빈 일정을 눌러 모달을 열었을 때 사용되는 데이터
export type FixedCategoryInfo = {
  categoryId: number;
  date: Dayjs;
}

// 새 일정 생성 모달에 필요한 데이터
export type NewScheduleModalInfo = {
  schedule?: ScheduleToRender,
  fixedCategoryInfo?: FixedCategoryInfo,
}

// 일정 검색 결과
export interface SearchResult {
  categories: string[];
  groupCode: number;
  content: string;
  isFinished: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

// Modal Context 관련 타입들
export type ModalType = 'schedule' | 'category' | 'newSchedule' | 'search' | 'tutorial';
export type ModalProps = ( ScheduleModalProps | CategoryModalProps | NewScheduleModalProps | SearchModalProps | TutorialModalProps );
export type ModalKey =
  | { key: 'schedule'; modalProps: ScheduleModalProps }
  | { key: 'category'; modalProps: CategoryModalProps }
  | { key: 'newSchedule'; modalProps: NewScheduleModalProps }
  | { key: 'search'; modalProps: SearchModalProps }
  | { key: 'tutorial'; modalProps: TutorialModalProps };

export type ModalStatus = 'open' | 'closing' | 'closed';