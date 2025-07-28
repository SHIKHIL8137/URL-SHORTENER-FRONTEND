import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { refresh } from "../api/Api";
import store from "../redux/store/store";
import { logout } from "../redux/slice/userSlice";
const BaseUrl = import.meta.env.VITE_BACKEND_URL;


const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isAuthRoute = ["/login", "/register", "/refresh"].some((path) =>
        originalRequest.url?.includes(path)
      );
      if (
        error.response?.status === 401 &&
        !isAuthRoute &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await refresh();
          if (response.data?.status) {
            return instance(originalRequest);
          }
          
        } catch (refreshError: any) {
          if(refreshError?.response?.data?.tokenMissing || refreshError?.response?.data?.invalidToken){
            store.dispatch(logout())
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

attachInterceptors(axiosInstance);
