import { useQuery } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { usersApi } from '~/infrastructure/serverApi/v1/users/api';
import { QueryKey } from '~/application/managers/queryClient/config';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

interface QueryArgs {
  userId: number;
  options?: {
    enabled?: boolean;
  } & ResponseMessageEventHandlers;
}

export function createUserProfileQueryKey(userId: number) {
  return [QueryKey.UserProfile, userId];
}

export function useUserProfileQuery(args: QueryArgs) {
  return useQuery({
    queryKey: createUserProfileQueryKey(args.userId),
    queryFn: () => usersApi.getProfileByUserId(args.userId),
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
