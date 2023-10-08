import { Query, QueryCache, QueryClient } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverGateway/types';

function onError(error: unknown, query: Query) {
  if (typeof query.meta?.onError === 'function') {
    query.meta.onError(error as ServerResponse);
  }
}

function onSuccess(response: unknown, query: Query) {
  if (typeof query.meta?.onSuccess === 'function') {
    query.meta.onSuccess(response as ServerResponse);
  }
}

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError,
      onSuccess,
    }),
  });
}
