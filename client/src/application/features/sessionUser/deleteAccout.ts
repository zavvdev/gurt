import { useMutation } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useDeleteSessionUserAccount(
  args?: ResponseMessageEventHandlers,
) {
  const { mutate, isLoading } = useMutation(
    () => {
      return sessionUserApi.del();
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
