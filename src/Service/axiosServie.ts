import axios, { AxiosInstance } from 'axios';

export const baseUrl : string = '/api';

export const AxiosUtility: AxiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });


