import axios from "axios";

// TODO env 파일로 빼기
export const serverURL = 'https://wplanner.co.kr/';
export const baseURL = `${serverURL}api/`;

export const noAuthAPI = axios.create({
  baseURL,
});

export const authAPI = axios.create({
  baseURL,
});

authAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('at')}`;
  
  return config;
});