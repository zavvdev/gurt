import axios, { AxiosRequestConfig } from 'axios';

const createServerWebClient = () => {
  const requestConfig: AxiosRequestConfig = {
    baseURL:
      process.env.SERVER_WEB_ENDPOINT ||
      process.env.NEXT_PUBLIC_SERVER_WEB_ENDPOINT,
  };
  const serverWebClient = axios.create(requestConfig);
  serverWebClient.defaults.withCredentials = true;
  return serverWebClient;
};

const createServerApiClient = () => {
  const requestConfig: AxiosRequestConfig = {
    baseURL:
      process.env.SERVER_API_ENDPOINT ||
      process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const serverApiClient = axios.create(requestConfig);
  serverApiClient.defaults.withCredentials = true;
  return serverApiClient;
};

export const serverWebClient = createServerWebClient();
export const serverApiClient = createServerApiClient();
