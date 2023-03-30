import axios from "axios";
import { getUserToken } from "../service";

export const axiosOpen = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const createAxiosSecureInstance = (contentType) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': contentType,
      'Accept': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
      if(getUserToken()){
        config.headers.Authorization = `Bearer ${getUserToken()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosSecure = createAxiosSecureInstance('application/json');
export const axiosSecureFile = createAxiosSecureInstance('multipart/form-data');