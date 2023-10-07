import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import {
  ServerResponseMessage,
  serverResponseSchema,
} from '~/infrastructure/serverGateway/types';
import { Http } from '~/infrastructure/http';
import { publicSessionId } from '~/infrastructure/serverGateway/utilities';

const responseSuccessInterceptor = <T, K>(response: AxiosResponse<T, K>) => {
  if (serverResponseSchema.isValidSync(response.data, { strict: true })) {
    return response;
  }
  throw new Error('Invalid Server Response.');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseErrorInterceptor = (error: any) => {
  const serverResponse = error?.response?.data;
  if (serverResponseSchema.isValidSync(serverResponse, { strict: true })) {
    if (serverResponse.message === ServerResponseMessage.Unauthorized) {
      publicSessionId.remove();
      window.location.href = PUBLIC_ROUTES.auth.login();
    }
    if (serverResponse.message === ServerResponseMessage.EmailNotVerified) {
      window.location.href = PRIVATE_ROUTES.resendVerifyEmail();
    }
    return Promise.reject(error?.response?.data);
  }
  throw new Error('Invalid Server Response.');
};

const web = (() => {
  const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_SERVER_WEB_ENDPOINT,
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
    baseURL: import.meta.env.VITE_SERVER_API_ENDPOINT,
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
