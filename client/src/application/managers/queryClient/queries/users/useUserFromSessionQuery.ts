import { useQuery } from '@tanstack/react-query';
import { usersGateway } from '~/infrastructure/serverGateway/v1/users/gateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs extends ResponseMessageEventHandlers {
  enabled?: boolean;
}

export function createUserFromSessionQueryKey() {
  return [QueryKey.UserFromSession];
}

export function useUserFromSessionQuery(args?: QueryArgs) {
  return useQuery({
    queryKey: createUserFromSessionQueryKey(),
    queryFn: () => usersGateway.getFromSession(),
    meta: {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
      },
    },
    enabled: args?.enabled,
  });
}
