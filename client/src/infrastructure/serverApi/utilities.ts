import * as yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import {
  ExtractedValidationError,
  ServerResponse,
  ServerResponseMessage,
  ServerResponseStatus,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { persistedStorage } from '~/infrastructure/persistedStorage';
import { PUBLIC_SESSION_ID_NAME } from '~/infrastructure/serverApi/config';
import { errorReporter } from '~/infrastructure/errorReporter';

export function validateServerSuccessResponseData<
  S extends yup.InferType<yup.Schema>,
>(response: ServerResponse<S>, schema: yup.Schema): ServerResponse<S> {
  if (response?.status === ServerResponseStatus.Success) {
    try {
      return {
        ...response,
        data: schema.validateSync(response.data, { strict: true }),
      };
    } catch (e) {
      errorReporter.report({
        location: 'serverApi/utilities@validateServerSuccessResponseData',
        error: e,
      });
      throw e;
    }
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

export const publicSessionId = {
  set: () => persistedStorage.put(PUBLIC_SESSION_ID_NAME, uuidV4()),
  get: () => persistedStorage.get(PUBLIC_SESSION_ID_NAME),
  remove: () => persistedStorage.remove(PUBLIC_SESSION_ID_NAME),
};

export function removeNullishFromRequestPayload<T extends object>(payload: T) {
  return Object.entries(payload).reduce(
    (res, [key, value]) =>
      value !== null && value !== undefined ? { ...res, [key]: value } : res,
    {},
  );
}
