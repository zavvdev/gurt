import { useQuery } from '@tanstack/react-query';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import {
  QueryKey,
  QueryMetaKey,
} from '~/application/managers/queryClient/config';
import { Notification } from '~/application/services/NotificationService';

interface QueryArgs {
  id: number;
  options?: {
    enabled?: boolean;
    errorNotification?: Notification;
    successNotification?: Notification;
  };
}

export function createUserQueryKey(id: number) {
  return [QueryKey.User, id];
}

export function useUserQuery(args: QueryArgs) {
  return useQuery({
    queryKey: createUserQueryKey(args.id),
    queryFn: () => userGateway.getById(args.id),
    meta: {
      [QueryMetaKey.ErrorNotification]: args?.options?.errorNotification,
      [QueryMetaKey.SuccessNotification]: args?.options?.successNotification,
    },
    enabled: args?.options?.enabled,
  });
}
