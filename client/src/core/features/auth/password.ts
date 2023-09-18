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
  onSuccess?: (message: ServerResponseMessage | null) => void;
}

export function useForgotPassword(args?: UseForgotPassword) {
  const { mutate, isLoading } = useMutation(
    (form: ForgotPasswordForm) => {
      return authGateway.forgotPassword({
        email: form.email,
      });
    },
    {
      onMutate: async () => {
        await authGateway.csrfCookie();
      },
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
