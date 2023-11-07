import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTE_AFTER_AUTH } from '~/routes';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverApi/types';
import { authApi } from '~/infrastructure/serverApi/v1/auth/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';
import { ForgotPasswordForm } from '~/application/features/auth/password/types';

export function useForgotPassword(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (form: ForgotPasswordForm) => {
      return authApi.forgotPassword({
        email: form.email,
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
        }
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
