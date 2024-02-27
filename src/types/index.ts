import { NewScheduleModalProps } from "@/components/common/new-schedule-modal/NewScheduleModal";
import { CategoryModalProps } from "@/components/common/category-modal/CategoryModal";
import { ScheduleModalProps } from "@/components/common/schedule-modal/ScheduleModal";
import { SearchModalProps } from "@/components/common/search-modal/SearchModal";
import { Dayjs } from "dayjs";
import { TutorialModalProps } from "@/components/common/tutorial-modal/TutorialModal";
import { ReactNode } from "react";

export type CategoryColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray'
  | 'newRed'
  | 'newOrange'
  | 'newGreen'
  | 'newPurple'
  | 'newPink';

export type Device = 'mobile' | 'tablet' | 'desktop';
/**
 * 
 */

// 응답 데이터 형식
export type ResDto<T> = {
  resultMessage: string;
  resultBody: T;
}

export interface ErrorRes {
  errorCode: string;
  errorMessage: string;
}

// 약관동의 body
export interface AgreeDto {
  didAgree: boolean;
  stateId: string;
}

// 서버에서 오는 카테고리 데이터
// GET /api/schedules/{year}/{month}
export type CategoryDto = {
  categoryId: string;
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
  id: string;
  name: string;
  level: number;
  color: CategoryColor;
  startDate: Dayjs;
  endDate: Dayjs;
  description: string;
  isVisible: boolean;
  parentId: string | null;
  schedules: ScheduleToRender[];
}

export interface CategoryUpdateDto {
  categoryName: string;
  categoryDescription: string;
  categoryVisible: boolean;
  categoryColor: CategoryColor;
}

// 서버에서 오는 일정 데이터
// GET /api/schedules/{year}/{month}
export type ScheduleDto = {
  scheduleId: string;
  scheduleGroupCode: string;
  categoryId: string;
  scheduleContent: string;
  scheduleDate: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  schedulePriority: number;
  isPriority: boolean;
  isFinished: boolean;
}

// 캘린더에 렌더링하기 위한 카테고리 데이터
export type CategoryToRender = {
  category: Category;
  lines: (ScheduleToRender | null)[][];
};

// 캘린더에 렌더링하기 위한 일정 데이터
export type ScheduleToRender = {
  id: string;
  groupCode: string;
  categoryId: string;
  content: string;
  isPriority: boolean;
  isFinished: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
  startDayToRender: number;
  endDayToRender: number;
}

// 우선순위를 렌더링하기 위한 데이터
export type Priority = {
  categoryId: string;
  scheduleId: string;
  groupCode: string;
  date: Dayjs;
  priority: number;
  isFinished: boolean;
  color: CategoryColor;
  level: number;
  content: string;
};

// 새 카테고리를 만들 때 보내는 데이터
export interface NewCategoryDto {
  categoryColor: CategoryColor;
  categoryDescription: string;
  categoryStartDate: string;
  categoryLevel: number;
  categoryName: string;
  categoryParentId: string | null;
  categoryVisible: boolean;
}

// 새 일정을 만들때 보내는 데이터
// POST /api/schedules
export type NewScheduleDto = {
  scheduleContent: string,
  scheduleStartDate: string,
  scheduleEndDate: string,
  categoryId: string,
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

// 일정 수정을 위해 모달을 열었을 때 사용되는 데이터
export interface UpdateScheduleInfo {
  schedule: ScheduleToRender;
}

// 빈 일정을 눌러 모달을 열었을 때 사용되는 데이터
export type FixedCategoryInfo = {
  categoryId: string;
  date: Dayjs;
}

// 새 일정 생성 모달에 필요한 데이터
export type NewScheduleModalInfo = {
  updateScheduleInfo?: UpdateScheduleInfo,
  fixedCategoryInfo?: FixedCategoryInfo,
}

// 일정 검색 결과
export interface SearchedScheduleDto {
  scheduleId: string;
  scheduleGroupCode: string;
  categoryId: string;
  scheduleContent: string;
  isPriority: boolean;
  isFinished: boolean;
  scheduleStartDate: string;
  scheduleEndDate: string;
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

export interface ButtonInfo {
  label: string;
  onClick: () => void;
  warning?: boolean;
}

export interface PopupInfo {
  title: string;
  description: ReactNode;
  buttons: ButtonInfo[];
}

export type PopupButtonType = 'primary' | 'cancel' | 'warning';

interface PopupButton {
  label: string;
  onClick: () => void;
  type: PopupButtonType;
}

export interface NewPopupInfo {
  title: string;
  description: ReactNode;
  buttons: PopupButton[];
}