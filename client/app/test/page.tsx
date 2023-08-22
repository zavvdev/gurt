'use client';

import { serverApiClient, serverWebClient } from '../serverClients';

export default function Home() {
  const onLogin = async () => {
    await serverWebClient.get('/v1/sanctum/csrf-cookie');
    await serverWebClient.post('/v1/login', {
      email: 'doejohn@mail.com',
      password: '123',
    });
  };

  const onGetUser = async () => {
    const user = await serverApiClient.get('/v1/user');
    console.log(user);
  };

  return (
    <main>
      <h1>Gurt</h1>
      <button onClick={onLogin}>Login</button>
      <button onClick={onGetUser}>Get user</button>
    </main>
  );
}
