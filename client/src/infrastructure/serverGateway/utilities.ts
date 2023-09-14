import * as yup from 'yup';
import {
  SESSION_COOKIE_NAME,
  XSRF_COOKIE_TOKEN_NAME,
} from '~/infrastructure/serverGateway/config';
import {
  ExtractedValidationError,
  ServerResponse,
  ServerResponseMessage,
  ServerResponseStatus,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { cookieStorage } from '~/infrastructure/cookieStorage';

export function validateResponse<S extends yup.InferType<yup.Schema>>(
  response: ServerResponse<S>,
  schema: yup.Schema,
  condition: (response: ServerResponse<S>) => boolean = () => true,
): ServerResponse<S> {
  if (
    response?.status === ServerResponseStatus.Success &&
    condition(response)
  ) {
    return {
      ...response,
      data: schema.validateSync(response.data, { strict: true }),
    };
  }
  return response;
}

export function extractValidationErrors(
  response: ServerValidationErrorsResponse,
): ExtractedValidationError[] {
  if (
    response?.message === ServerResponseMessage.ValidationError &&
    typeof response?.data === 'object' &&
    response?.data !== null
  ) {
    const entries = Object.entries(response.data);
    return entries.map(([field, errorKeys]) => ({
      field,
      errorKeys,
    }));
  }
  return [];
}

export function isAuthenticated() {
  return Boolean(cookieStorage.get(SESSION_COOKIE_NAME));
}

export function removeCurrentSession() {
  cookieStorage.remove(SESSION_COOKIE_NAME);
  cookieStorage.remove(XSRF_COOKIE_TOKEN_NAME);
}
