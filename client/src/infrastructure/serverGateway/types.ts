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
}

export enum ServerValidationError {
  Required = 'required',

  AlreadyExists = 'already_exists',

  StringType = 'string_type',

  TooLong = 'too_long',

  TooShort = 'too_short',

  NotConfirmed = 'not_confirmed',

  InvalidFormat = 'invalid_format',
}

export type ServerResponse<T = unknown> = {
  status: ServerResponseStatus;
  message: ServerResponseMessage | null;
  data: T | null;
};

export type ServerValidationErrorsResponse = ServerResponse<Record<
  string,
  string[]
> | null>;

export interface ExtractedValidationError {
  field: string;
  errorKeys: string[];
}
