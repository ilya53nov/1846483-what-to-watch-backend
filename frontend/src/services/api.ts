import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import { store } from '../store';
import { setToDefault } from '../store/user-data/user-data';

const BACKEND_URL = '/';
const REQUEST_TIMEOUT = 5000;
const UNAUTHORIZED_STATUS_CODE = 401;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer: ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === UNAUTHORIZED_STATUS_CODE) {
        store.dispatch(setToDefault());
      }

      return Promise.reject(error);
    }
  );

  return api;
};
