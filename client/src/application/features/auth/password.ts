import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { MutationEvents } from '~/application/managers/queryClient/types';

// Forgot password

export interface ForgotPasswordForm {
  email: string;
}

export function useForgotPassword(args?: MutationEvents) {
  const navigate = useNavigate();

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
          navigate(PRIVATE_ROUTES.home());
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
  const navigate = useNavigate();

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
        await authGateway.csrfCookie();
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.(response.message);
          navigate(PRIVATE_ROUTES.home());
        } else {
          args?.onSuccess?.(response.message);
          navigate(PUBLIC_ROUTES.auth.login());
        }
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
