import { useQuery } from '@tanstack/react-query';
import { usersApi } from '~/infrastructure/serverApi/v1/users/api';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs {
  id: number;
  options?: {
    enabled?: boolean;
  } & ResponseMessageEventHandlers;
}

export function createUserQueryKey(id: number) {
  return [QueryKey.User, id];
}

export function useUserQuery(args: QueryArgs) {
  return useQuery({
    queryKey: createUserQueryKey(args.id),
    queryFn: () => usersApi.getById(args.id),
    meta: {
      onError: (response: ServerResponse) => {
        args?.options?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.options?.onSuccess?.(response.message);
      },
    },
    enabled: args?.options?.enabled,
  });
}
