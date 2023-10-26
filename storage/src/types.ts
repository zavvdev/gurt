import { Request } from 'express';

export enum ApiResponseMessage {
  InvalidRequest = 'invalid_request',
  UnexpectedError = 'unexpected_error',
  FileTooBig = 'file_too_big',
}

export enum ApiResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface ApiResponseData {
  name: string;
}

export interface ApiResponse {
  status: ApiResponseStatus;
  message: ApiResponseMessage | null;
  data: ApiResponseData | null;
}

export interface NodeError {
  message: string;
}

export interface ReqBody<P = unknown> extends Request {
  body: P;
}
