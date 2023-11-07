import { publicSessionId } from '~/infrastructure/serverApi/utilities';

export function usePublicAuthRoutePSIDGuard() {
  return {
    isAuthenticated: Boolean(publicSessionId.get()),
  };
}
