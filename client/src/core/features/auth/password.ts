import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PUBLIC_ROUTES } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';

// Forgot password

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
      onMutate: async () => {
        await authGateway.csrfCookie();
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.(response.message);
        } else {
          args?.onSuccess?.();
        }
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}

// Reset password

export interface ResetPasswordForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseResetPassword {
  onError?: (message: ServerResponseMessage | null) => void;
  onSuccess?: () => void;
}

export function useResetPassword(args?: UseResetPassword) {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    ({ form, token }: { form: ResetPasswordForm; token: string }) => {
      return authGateway.resetPassword({
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirm,
        token,
      });
    },
    {
      onMutate: async () => {
        // await authGateway.csrfCookie();
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: () => {
        args?.onSuccess?.();
        router.push(PUBLIC_ROUTES.auth.login());
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
