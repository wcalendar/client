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

  getCategories: async (y: number, m: number): Promise<ResDto<CategoryDto[]>> => {
    return (await authAPI.get(`/categories/${y}/${m+1}`)).data;
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

  getCalendarData: async (y: number, m: number): Promise<ResDto<CategoryDto[]>> => {
    return (await authAPI.get(`/schedules/${y}/${m+1}`)).data;
  },
  getCategoriesByPeriod: async (sy: number, sm: number, ey: number, em: number): Promise<ResDto<CategoryDto[]>> => {
    return (await authAPI.get(`/categories?startYear=${sy}&startMonth=${sm+1}&endYear=${ey}&endMonth=${em+1}`)).data;
  },
  addSchedule: async (newScheduleDto: NewScheduleDto): Promise<ResDto<string>> => {
    return (await authAPI.post(`/schedules`, newScheduleDto)).data;
  },
  updateSchedule: async (newScheduleDto: NewScheduleDto, scheduleId: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules/${scheduleId}`, newScheduleDto)).data;
  },
  finishSchedule: async (scheduleId: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules/${scheduleId}/end`)).data;
  },
  deleteSchedule: async (scheduleId: string): Promise<ResDto<string>> => {
    return (await authAPI.delete(`/schedules/${scheduleId}`)).data;
  },
  updateSchedulePriority: async (scheduleOrderList: string[], scheduleDate: string): Promise<ResDto<string>> => {
    return (await authAPI.put(`/schedules`, { scheduleOrderList, scheduleDate })).data;
  },
  searchSchedule: async (searchTerm: string): Promise<ResDto<SearchedScheduleDto[]>> => {
    return (await authAPI.get(`schedules/search?content=${searchTerm}`)).data;
  },
}