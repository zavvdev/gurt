import { useMutation } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { usersApi } from '~/infrastructure/serverApi/v1/users/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useDeleteUserAccount(args?: ResponseMessageEventHandlers) {
  const { mutate, isLoading } = useMutation(
    () => {
      return usersApi.deleteMe();
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
