import { CategoryDto, ResDto } from "@/types";
import axios from "axios";

// TODO env 파일로 빼기
export const serverURL = 'https://wplanner.co.kr/';
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
  getCalendarData: async (y: number, m: number): Promise<ResDto<CategoryDto[]>> => {
    return (await authAPI.get(`/schedules/${y}/${m+1}`)).data;
  },
  getCategoriesByPeriod: async (sy: number, sm: number, ey: number, em: number): Promise<ResDto<CategoryDto[]>> => {
    return (await authAPI.get(`/categories?startYear=${sy}&startMonth=${sm+1}&endYear=${ey}&endMonth=${em+1}`)).data;
  },
}