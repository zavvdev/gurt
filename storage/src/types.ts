import { Request } from 'express';

export type UserId = number | string;

export enum ApiResponseMessage {
  InvalidRequest = 'invalid_request',
  UnexpectedError = 'unexpected_error',
  FileTooBig = 'file_too_big',
  Forbidden = 'forbidden',
}

export enum ApiResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  message: ApiResponseMessage | null;
  data: T | null;
}

export interface NodeError {
  message: string;
}

export interface ReqBody<P = unknown> extends Request {
  body: P;
}
