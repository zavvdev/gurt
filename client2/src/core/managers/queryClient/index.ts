import { Query, QueryCache, QueryClient } from '@tanstack/react-query';
import {
  Notification,
  notificationService,
} from '~/core/services/NotificationService';
import { QueryMetaKey } from '~/core/managers/queryClient/config';

function onError(_: unknown, query: Query) {
  if (query?.meta && QueryMetaKey.ErrorNotification in query.meta) {
    notificationService.show(
      query.meta[QueryMetaKey.ErrorNotification] as Notification,
    );
  }
}

function onSuccess(_: unknown, query: Query) {
  if (query?.meta && QueryMetaKey.SuccessNotification in query.meta) {
    notificationService.show(
      query.meta[QueryMetaKey.SuccessNotification] as Notification,
    );
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
