import { useQuery } from '@tanstack/react-query';
import { profileGateway } from '~/infrastructure/serverGateway/v1/profile/gateway';
import {
  QueryKey,
  QueryMetaKey,
} from '~/application/managers/queryClient/config';
import { Notification } from '~/application/services/NotificationService';

interface QueryArgs {
  userId: number;
  options?: {
    enabled?: boolean;
    errorNotification?: Notification;
    successNotification?: Notification;
  };
}

export function createProfileByUserIdQueryKey(userId: number) {
  return [QueryKey.ProfileByUserId, userId];
}

export function useProfileByUserIdQuery(args: QueryArgs) {
  return useQuery({
    queryKey: createProfileByUserIdQueryKey(args.userId),
    queryFn: () => profileGateway.getByUserId({ userId: args.userId }),
    meta: {
      [QueryMetaKey.ErrorNotification]: args?.options?.errorNotification,
      [QueryMetaKey.SuccessNotification]: args?.options?.successNotification,
    },
    enabled: args?.options?.enabled,
  });
}
