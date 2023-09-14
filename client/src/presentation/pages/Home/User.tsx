'use client';

import { useEffect, useState } from 'react';
// eslint-disable-next-line
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';

export function User() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    (async () => {
      const user = await serverGateway.http.api.get('/v1/user');
      setUser(user);
    })();
  }, []);

  return (
    <div>
      <div>Home</div>
      {JSON.stringify(user)}
    </div>
  );
}
