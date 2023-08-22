import { serverApiClient } from './serverClients';

export default async function Home() {
  const messageRequest = await serverApiClient.get('/v1/greet');

  return (
    <main>
      <h1>Gurt</h1>
      Message:{' '}
      {messageRequest?.data?.data
        ? JSON.stringify(messageRequest.data.data)
        : ''}
    </main>
  );
}
