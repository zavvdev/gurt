import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, ROUTE_AFTER_AUTH } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverApi/types';
import { authApi } from '~/infrastructure/serverApi/v1/auth/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';
import { ResetPasswordForm } from '~/application/features/auth/password/types';

export function useResetPassword(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    ({ form, token }: { form: ResetPasswordForm; token: string }) => {
      return authApi.resetPassword({
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirm,
        token,
      });
    },
    {
      onMutate: async () => {
        await authApi.csrfCookie();
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
