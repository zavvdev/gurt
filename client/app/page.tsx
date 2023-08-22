'use client';

import { useState } from 'react';
import { serverApiClient, serverWebClient } from './serverClients';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  const onLogin = async () => {
    await serverWebClient.get('/v1/sanctum/csrf-cookie');
    await serverWebClient.post('/v1/auth/login', {
      email: 'johndoe@test.com',
      password: '123',
    });
  };

  const onGetUser = async () => {
    const user = await serverApiClient.get('/v1/user');
    setUser(user);
  };

  return (
    <main>
      <h1>Gurt</h1>
      <button onClick={onLogin}>Login</button>
      <br />
      <button onClick={onGetUser}>Get user</button>
      <br />
      <pre>{JSON.stringify(user)}</pre>
    </main>
  );
}
