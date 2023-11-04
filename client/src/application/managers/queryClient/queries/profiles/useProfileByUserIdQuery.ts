import { useQuery } from '@tanstack/react-query';
import { profilesGateway } from '~/infrastructure/serverGateway/v1/profiles/gateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs {
  userId: number;
  options?: {
    enabled?: boolean;
  } & ResponseMessageEventHandlers;
}

export function createProfileByUserIdQueryKey(userId: number) {
  return [QueryKey.ProfileByUserId, userId];
}

export function useProfileByUserIdQuery(args: QueryArgs) {
  return useQuery({
    queryKey: createProfileByUserIdQueryKey(args.userId),
    queryFn: () => profilesGateway.getByUserId({ userId: args.userId }),
    meta: {
      onError: (response: ServerResponse) => {
        args.options?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args.options?.onSuccess?.(response.message);
      },
    },
    enabled: args?.options?.enabled,
  });
}
