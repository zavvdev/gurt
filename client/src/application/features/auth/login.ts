import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTE_AFTER_AUTH } from '~/routes';
import { authApi } from '~/infrastructure/serverApi/v1/auth/api';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverApi/types';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export interface LoginForm {
  login: string;
  password: string;
  remember: boolean;
}

export function useLogin(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();

  const mutation = useMutation(
    (form: LoginForm) => {
      return authApi.login({
        login: form.login,
        password: form.password,
        remember: form.remember,
      });
    },
    {
      onMutate: async () => {
        await authApi.csrfCookie();
      },
      onSuccess: (response: ServerResponse) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.(response.message);
        } else {
          args?.onSuccess?.(response.message);
        }
        navigate(ROUTE_AFTER_AUTH);
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
