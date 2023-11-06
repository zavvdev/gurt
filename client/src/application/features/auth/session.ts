import { useEffect, useState } from 'react';
import { publicSessionId } from '~/infrastructure/serverApi/utilities';
import { usersApi } from '~/infrastructure/serverApi/v1/users/api';

export function usePrivateRoutePSIDGuard() {
  const isPSIDAvailable = Boolean(publicSessionId.get());
  const [status, setStatus] = useState<'valid' | 'verifying'>('verifying');

  useEffect(() => {
    if (isPSIDAvailable) {
      setStatus('valid');
    } else {
      setStatus('verifying');
      usersApi.getMe().then(() => {
        publicSessionId.set();
        setStatus('valid');
      });
    }
  }, [isPSIDAvailable]);

  return status;
}

export function usePublicAuthRoutePSIDGuard() {
  return {
    isAuthenticated: Boolean(publicSessionId.get()),
  };
}
