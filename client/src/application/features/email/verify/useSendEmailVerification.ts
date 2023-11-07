import { useMutation } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { emailApi } from '~/infrastructure/serverApi/v1/email/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useSendEmailVerification(args?: ResponseMessageEventHandlers) {
  const { mutate, isLoading } = useMutation(
    () => {
      return emailApi.sendVerification();
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
