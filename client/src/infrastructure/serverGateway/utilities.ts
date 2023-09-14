import * as yup from 'yup';
import {
  ServerResponse,
  ServerResponseStatus,
} from '~/infrastructure/serverGateway/config';

export function validateResponse<S extends yup.InferType<yup.Schema>>(
  response: ServerResponse<S>,
  schema: yup.Schema,
): ServerResponse<S> {
  if (response.status === ServerResponseStatus.Success) {
    return {
      ...response,
      data: schema.validateSync(response.data, { strict: true }),
    };
  }
  return response;
}
