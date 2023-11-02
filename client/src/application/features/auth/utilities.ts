import {
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_USERNAME_MAX_LENGTH,
  AUTH_USERNAME_MIN_LENGTH,
} from '~/application/features/auth/config';

export const isAuthNameLengthValid = (name: string) => {
  return (
    name.length >= AUTH_NAME_MIN_LENGTH && name.length <= AUTH_NAME_MAX_LENGTH
  );
};

export const isAuthUsernameLengthValid = (username: string) => {
  return (
    username.length >= AUTH_USERNAME_MIN_LENGTH &&
    username.length <= AUTH_USERNAME_MAX_LENGTH
  );
};
