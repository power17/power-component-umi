import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
const BASE_URL = 'http://localhost:7001';
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default service;
