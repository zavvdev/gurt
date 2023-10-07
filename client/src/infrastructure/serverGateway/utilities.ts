import * as yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import {
  ExtractedValidationError,
  ServerResponse,
  ServerResponseMessage,
  ServerResponseStatus,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { persistedStorage } from '~/infrastructure/persistedStorage';
import { PUBLIC_SESSION_ID_NAME } from '~/infrastructure/serverGateway/config';

export function validateServerResponseData<S extends yup.InferType<yup.Schema>>(
  response: ServerResponse<S>,
  schema: yup.Schema,
): ServerResponse<S> {
  if (
    response?.status === ServerResponseStatus.Success &&
    schema.isValidSync(response.data, { strict: true })
  ) {
    return response;
  }
  throw new Error('Invalid Server Response Data.');
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
