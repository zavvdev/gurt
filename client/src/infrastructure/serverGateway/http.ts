import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import {
  ServerResponseMessage,
  serverResponseSchema,
} from '~/infrastructure/serverGateway/types';
import { Http } from '~/infrastructure/http';
import { publicSessionId } from '~/infrastructure/serverGateway/utilities';
import { errorReporter } from '~/infrastructure/errorReporter';

const responseSuccessInterceptor = <T, K>(response: AxiosResponse<T, K>) => {
  try {
    return {
      ...response,
      data: serverResponseSchema.validateSync(response.data, { strict: true }),
    };
  } catch (e) {
    errorReporter.report({
      location: 'serverGateway/http@responseSuccessInterceptor',
      error: e,
    });
    throw new Error('Invalid Server Success Response.');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseErrorInterceptor = (error: any) => {
  try {
    const serverResponse = serverResponseSchema.validateSync(
      error?.response?.data,
      {
        strict: true,
      },
    );

    if (serverResponse.message === ServerResponseMessage.Unauthorized) {
      publicSessionId.remove();
      return (window.location.href = PUBLIC_ROUTES.auth.login());
    }
    if (serverResponse.message === ServerResponseMessage.EmailNotVerified) {
      return (window.location.href = PRIVATE_ROUTES.resendVerifyEmail());
    }

    errorReporter.report({
      location: 'serverGateway/http@responseErrorInterceptor',
      error: error?.response || error,
    });
    return Promise.reject(error?.response?.data);
  } catch (e) {
    errorReporter.report({
      location: 'serverGateway/http@responseErrorInterceptor',
      error: e,
    });
    throw new Error('Invalid Server Error Response.');
  }
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
