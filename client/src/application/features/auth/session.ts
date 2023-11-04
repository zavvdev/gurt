import { useEffect, useState } from 'react';
import { publicSessionId } from '~/infrastructure/serverGateway/utilities';
import { usersGateway } from '~/infrastructure/serverGateway/v1/users/gateway';

export function usePrivateRoutePSIDGuard() {
  const isPSIDAvailable = Boolean(publicSessionId.get());
  const [status, setStatus] = useState<'valid' | 'verifying'>('verifying');

  useEffect(() => {
    if (isPSIDAvailable) {
      setStatus('valid');
    } else {
      setStatus('verifying');
      usersGateway.getFromSession().then(() => {
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
