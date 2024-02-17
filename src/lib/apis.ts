import { calendarDummyData, categoryListDummyData, searchDummyData } from "@/dummies/calendar";
import { AgreeDto, CategoryDto, CategoryUpdateDto, NewCategoryDto, NewScheduleDto, ResDto, SearchedScheduleDto } from "@/types";
import axios, { AxiosResponse } from "axios";

// TODO env 파일로 빼기
export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
export const baseURL = `${serverURL}api/`;

export const noAuthAPI = axios.create({
  baseURL,
  validateStatus: (status: number) => {
    if(status >= 200 && status < 300) return true;

    else return false;
  },
});

export const authAPI = axios.create({
  baseURL,
  validateStatus: (status: number) => {
    if(status >= 200 && status < 300) return true;

    else return false;
  },
});

authAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('at')}`;
  
  return config;
});

export const fetchers = {
  getCalendarData: ([url, isDev, year, month]: [string, boolean, number, number]) => {
    if(isDev) return new Promise<CategoryDto[]>((resolve) => resolve(calendarDummyData[0].resultBody));
    else return authAPI.get<ResDto<CategoryDto[]>>(`${url}/${year}/${month+1}`).then(res => res.data.resultBody);
  },
  getCategories: ([url, isDev, year, month]: [string, boolean, number, number]) => {
    if(isDev) return new Promise<CategoryDto[]>((resolve) => resolve(categoryListDummyData));
    else return authAPI.get<ResDto<CategoryDto[]>>(`${url}/${year}/${month+1}`).then(res => res.data.resultBody);
  },
  getCategoriesByPeriod: ([url, isDev, sy, sm, ey, em]: [string, boolean, number, number, number, number]) => {
    if(isDev) return new Promise<CategoryDto[]>((resolve) => resolve(categoryListDummyData));
    else return authAPI.get<ResDto<CategoryDto[]>>(`${url}?startYear=${sy}&startMonth=${sm+1}&endYear=${ey}&endMonth=${em+1}`).then(res => res.data.resultBody);
  },
  searchSchedule: ([url, isDev, searchTerm]: [string, boolean, string]) => {
    if(isDev) return new Promise<SearchedScheduleDto[]>((resolve) => resolve(searchDummyData));
    else return authAPI.get<ResDto<SearchedScheduleDto[]>>(`${url}?content=${searchTerm}`).then(res => res.data.resultBody);
  }
};

export const apis = {
  agree: async (agreeDto: AgreeDto): Promise<AxiosResponse<ResDto<string>>> => {
    return (await noAuthAPI.post(`/terms/approval`, agreeDto));
  },
  logout: async (): Promise<ResDto<string>> => {
    return (await authAPI.post(`/user/logout`)).data;
  },
  signOut: async (): Promise<ResDto<string>> => {
    return (await authAPI.post(`/user/delete`)).data;
  },

  addCategory: async (newCategoryDto: NewCategoryDto): Promise<ResDto<{ categoryId: string }>> => {
    return (await authAPI.post(`/categories`, newCategoryDto)).data;
  },
  updateCategory: async (categoryId: string, categoryUpdateDto: CategoryUpdateDto): Promise<ResDto<string>> => {
    return (await authAPI.put(`/categories/${categoryId}`, categoryUpdateDto)).data;
  },
  moveCategory: async (newOrderList: string[]): Promise<ResDto<string>> => {
    return (await authAPI.put(`/categories/order`, {categoryOrderList: newOrderList})).data;
  },
  deleteCategory: async (categoryId: string, endDate: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/categories/${categoryId}/end-date`, { endDate })).data;
  },

  addSchedule: async (newScheduleDto: NewScheduleDto): Promise<ResDto<string>> => {
    return (await authAPI.post(`/schedules`, newScheduleDto)).data;
  },
  updateSchedule: async (newScheduleDto: NewScheduleDto, scheduleId: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules/${scheduleId}`, newScheduleDto)).data;
  },
  finishSchedule: async (scheduleId: string, isFinished: boolean): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules/${scheduleId}/end/${isFinished}`)).data;
  },
  deleteSchedule: async (scheduleId: string): Promise<ResDto<string>> => {
    return (await authAPI.delete(`/schedules/${scheduleId}`)).data;
  },
  updateSchedulePriority: async (scheduleOrderList: string[], scheduleDate: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules`, { scheduleOrderList, scheduleDate })).data;
  },
}