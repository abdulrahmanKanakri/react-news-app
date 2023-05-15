import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/config";
import storage from "@/utils/storage";
import { AppNotification } from "@/providers/notification";

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

const authRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (!config.headers) return config;

  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    AppNotification.error(message);

    return Promise.reject(error);
  }
);
