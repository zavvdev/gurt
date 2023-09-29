import { useEffect, useState } from 'react';
import { publicSessionId } from '~/infrastructure/serverGateway/utilities';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';

export function usePublicSessionIdGuard() {
  const isPSIDAvailable = Boolean(publicSessionId.get());
  const [status, setStatus] = useState<'valid' | 'verifying'>('verifying');

  useEffect(() => {
    if (isPSIDAvailable) {
      setStatus('valid');
    } else {
      setStatus('verifying');
      userGateway.getSessionUser().then(() => {
        publicSessionId.set();
        setStatus('valid');
      });
    }
  }, [isPSIDAvailable]);

  return status;
}
