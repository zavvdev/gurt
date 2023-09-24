import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PUBLIC_ROUTES, useCreateRoute } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { MutationEvents } from '~/core/managers/queryClient/types';

// Forgot password

export interface ForgotPasswordForm {
  email: string;
}

export function useForgotPassword(args?: MutationEvents) {
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
          args?.onSuccess?.(response.message);
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

export function useResetPassword(args?: MutationEvents) {
  const router = useRouter();
  const { r } = useCreateRoute();

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
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.(response.message);
        } else {
          args?.onSuccess?.(response.message);
          router.push(r(PUBLIC_ROUTES.auth.login()));
        }
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
