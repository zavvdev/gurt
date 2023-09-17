import { useMutation } from '@tanstack/react-query';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';

export interface ForgotPasswordForm {
  email: string;
}

interface UseForgotPassword {
  onError?: (message: ServerResponseMessage | null) => void;
  onSuccess?: () => void;
}

export function useForgotPassword(args?: UseForgotPassword) {
  const { mutate, isLoading } = useMutation(
    (form: ForgotPasswordForm) => {
      return authGateway.forgotPassword({
        email: form.email,
      });
    },
    {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: () => {
        args?.onSuccess?.();
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
