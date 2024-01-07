import * as yup from 'yup';

export enum ServerResponseStatus {
  Success = 'success',
  Error = 'error',
}

export enum ServerResponseMessage {
  NotAllowed = 'not_allowed',

  NotFound = 'not_found',

  Unauthorized = 'unauthorized',

  Unexpected = 'unexpected_error',

  ValidationError = 'validation_error',

  AlreadySent = 'already_sent',

  AlreadyLoggedIn = 'already_logged_in',

  EmailNotVerified = 'email_not_verified',

  RecordNotFound = 'record_not_found',

  UserNotFound = 'user_not_found',

  InvalidToken = 'invalid_token',

  InvalidSignature = 'invalid_signature',

  InvalidCurrentPassword = 'invalid_current_password',
}

export type ServerResponse<T = unknown> = {
  status: ServerResponseStatus;
  message: ServerResponseMessage | null;
  data: T | null;
};

export const serverResponseSchema: yup.Schema<ServerResponse> = yup.object({
  status: yup.string<ServerResponseStatus>().required(),
  message: yup.string<ServerResponseMessage>().required().nullable(),
  data: yup.mixed().required().nullable(),
});

export type ServerValidationErrorsResponse = ServerResponse<Record<
  string,
  string[]
> | null>;

export interface ExtractedValidationError {
  field: string;
  errorKeys: string[];
}
