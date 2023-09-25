import { cookieStorage } from '~/infrastructure/cookieStorage';
import { SESSION_COOKIE_NAME } from '~/infrastructure/serverGateway/config';

export function isAuthenticated() {
  return cookieStorage.get(SESSION_COOKIE_NAME);
}
