import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import { ServerResponseMessage } from '~/infrastructure/serverGateway/types';
import { Http } from '~/infrastructure/http';

const navigate = (to: string) => {
  if (global?.window) {
    window.location.href = to;
  } else {
    redirect(to);
  }
};

const responseSuccessInterceptor = <T, K>(response: AxiosResponse<T, K>) => {
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseErrorInterceptor = (error: any) => {
  const response = error?.response?.data || {};
  if (response.message === ServerResponseMessage.Unauthorized) {
    navigate(PUBLIC_ROUTES.auth.login());
  }
  if (response.message === ServerResponseMessage.EmailNotVerified) {
    navigate(PRIVATE_ROUTES.verifyEmail());
  }
  return Promise.reject(error?.response?.data);
};

const web = (() => {
  const requestConfig: AxiosRequestConfig = {
    baseURL:
      process.env.SERVER_WEB_ENDPOINT ||
      process.env.NEXT_PUBLIC_SERVER_WEB_ENDPOINT,
  };
  const client = axios.create(requestConfig);
  client.defaults.withCredentials = true;

  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );

  return new Http(client);
})();

const api = (() => {
  const requestConfig: AxiosRequestConfig = {
    baseURL:
      process.env.SERVER_API_ENDPOINT ||
      process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const client = axios.create(requestConfig);
  client.defaults.withCredentials = true;

  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );

  return new Http(client);
})();

export const http = {
  web,
  api,
};