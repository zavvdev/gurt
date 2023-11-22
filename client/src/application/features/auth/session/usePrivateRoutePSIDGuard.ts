import { useEffect, useState } from 'react';
import { publicSessionId } from '~/infrastructure/serverApi/utilities';
import { commonApi } from '~/infrastructure/serverApi/v1/common';

export function usePrivateRoutePSIDGuard() {
  const isPSIDAvailable = Boolean(publicSessionId.get());
  const [status, setStatus] = useState<'valid' | 'verifying'>('verifying');

  useEffect(() => {
    if (isPSIDAvailable) {
      setStatus('valid');
    } else {
      setStatus('verifying');
      commonApi.ping().then(() => {
        publicSessionId.set();
        setStatus('valid');
      });
    }
  }, [isPSIDAvailable]);

  return status;
}
