import { useQuery } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs extends ResponseMessageEventHandlers {
  enabled?: boolean;
}

export function createSessionUserQueryKey() {
  return [QueryKey.SessionUser];
}

export function useSessionUserQuery(args?: QueryArgs) {
  return useQuery({
    queryKey: createSessionUserQueryKey(),
    queryFn: () => sessionUserApi.get(),
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
