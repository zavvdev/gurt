import { useQuery } from '@tanstack/react-query';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import { QueryKey, QueryMetaKey } from '~/core/managers/queryClient/config';
import { Notification } from '~/core/services/NotificationService';

interface UseSessionUserArgs {
  errorNotification?: Notification;
  successNotification?: Notification;
}

export function useSessionUser(args?: UseSessionUserArgs) {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKey.SessionUser],
    queryFn: () => userGateway.getSessionUser(),
    meta: {
      [QueryMetaKey.ErrorNotification]: args?.errorNotification,
      [QueryMetaKey.SuccessNotification]: args?.successNotification,
    },
  });

  return {
    data,
    isError,
    isLoading,
  };
}
