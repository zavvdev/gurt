'use client';

import { useSessionUser } from '~/core/features/user/sessionUser';
import { notificationService } from '~/core/services/NotificationService';

export function User() {
  const sessionUser = useSessionUser({
    errorNotification: notificationService.createNotification(
      'error',
      'Error message',
    ),
    successNotification: notificationService.createNotification(
      'success',
      'Success notification',
    ),
  });

  return (
    <div>
      <div>Home</div>
      {JSON.stringify(sessionUser.data)}
    </div>
  );
}
