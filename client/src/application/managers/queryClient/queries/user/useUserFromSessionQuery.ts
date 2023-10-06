import { useQuery } from '@tanstack/react-query';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import {
  QueryKey,
  QueryMetaKey,
} from '~/application/managers/queryClient/config';
import { Notification } from '~/application/services/NotificationService';

interface QueryArgs {
  enabled?: boolean;
  errorNotification?: Notification;
  successNotification?: Notification;
}

export function createUserFromSessionQueryKey() {
  return [QueryKey.UserFromSession];
}

export function useUserFromSessionQuery(args?: QueryArgs) {
  return useQuery({
    queryKey: createUserFromSessionQueryKey(),
    queryFn: () => userGateway.getFromSession(),
    meta: {
      [QueryMetaKey.ErrorNotification]: args?.errorNotification,
      [QueryMetaKey.SuccessNotification]: args?.successNotification,
    },
    enabled: args?.enabled,
  });
}
