import { useMutation } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { userGateway } from '~/infrastructure/serverGateway/v1/user/gateway';
import { MutationEvents } from '~/application/managers/queryClient/types';

export function useDeleteUserAccount(args?: MutationEvents) {
  const { mutate, isLoading } = useMutation(
    () => {
      return userGateway.delete();
    },
    {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
