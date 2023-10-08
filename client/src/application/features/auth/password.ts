import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, ROUTE_AFTER_AUTH } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

// Forgot password

export interface ForgotPasswordForm {
  email: string;
}

export function useForgotPassword(args?: ResponseMessageEventHandlers) {
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
          navigate(ROUTE_AFTER_AUTH);
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

export function useResetPassword(args?: ResponseMessageEventHandlers) {
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
          navigate(ROUTE_AFTER_AUTH);
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
