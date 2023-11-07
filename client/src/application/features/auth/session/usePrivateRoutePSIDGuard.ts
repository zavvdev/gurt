import { useEffect, useState } from 'react';
import { publicSessionId } from '~/infrastructure/serverApi/utilities';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';

export function usePrivateRoutePSIDGuard() {
  const isPSIDAvailable = Boolean(publicSessionId.get());
  const [status, setStatus] = useState<'valid' | 'verifying'>('verifying');

  useEffect(() => {
    if (isPSIDAvailable) {
      setStatus('valid');
    } else {
      setStatus('verifying');
      sessionUserApi.get().then(() => {
        publicSessionId.set();
        setStatus('valid');
      });
    }
  }, [isPSIDAvailable]);

  return status;
}
