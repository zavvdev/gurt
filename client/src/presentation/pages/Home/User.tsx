'use client';

import { useSessionUserQuery } from '~/application/managers/queryClient/queries/useSessionUserQuery';
import { notificationService } from '~/application/services/NotificationService';

export function User() {
  const sessionUser = useSessionUserQuery({
    errorNotification: notificationService.createNotification(
      'error',
      'Error message 1',
    ),
  });

  return <pre>{JSON.stringify(sessionUser.data, null, 2)}</pre>;
}
