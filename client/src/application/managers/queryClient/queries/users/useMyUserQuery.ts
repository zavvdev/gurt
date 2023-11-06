import { useQuery } from '@tanstack/react-query';
import { usersApi } from '~/infrastructure/serverApi/v1/users/api';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs extends ResponseMessageEventHandlers {
  enabled?: boolean;
}

export function createMyUserQueryKey() {
  return [QueryKey.MyUser];
}

export function useMyUserQuery(args?: QueryArgs) {
  return useQuery({
    queryKey: createMyUserQueryKey(),
    queryFn: () => usersApi.getMe(),
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
