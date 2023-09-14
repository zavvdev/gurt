import { useMutation } from '@tanstack/react-query';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { emailGateway } from '~/infrastructure/serverGateway/v1/email/gateway';

interface OnSuccess {
  isAlreadySent: boolean;
}

interface UseVerifyEmailArgs {
  onError?: () => void;
  onSuccess?: (args: OnSuccess) => void;
}

export function useVerifyEmail({ onError, onSuccess }: UseVerifyEmailArgs) {
  const { mutate, isLoading } = useMutation(
    () => {
      return emailGateway.sendVerification();
    },
    {
      onError: () => {
        onError?.();
      },
      onSuccess: (e: ServerResponse) => {
        onSuccess?.({
          isAlreadySent: e.message === ServerResponseMessage.AlreadySent,
        });
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
