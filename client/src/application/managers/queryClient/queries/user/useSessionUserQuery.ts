import { useQuery } from '@tanstack/react-query';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import {
  QueryKey,
  QueryMetaKey,
} from '~/application/managers/queryClient/config';
import { Notification } from '~/application/services/NotificationService';

interface QueryArgs {
  errorNotification?: Notification;
  successNotification?: Notification;
}

export function createSessionUserQueryKey() {
  return [QueryKey.SessionUser];
}

export function useSessionUserQuery(args?: QueryArgs) {
  return useQuery({
    queryKey: createSessionUserQueryKey(),
    queryFn: () => userGateway.getSessionUser(),
    meta: {
      [QueryMetaKey.ErrorNotification]: args?.errorNotification,
      [QueryMetaKey.SuccessNotification]: args?.successNotification,
    },
  });
}
