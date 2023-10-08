import { useQuery } from '@tanstack/react-query';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
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
    queryFn: () => userGateway.getById(args.id),
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
