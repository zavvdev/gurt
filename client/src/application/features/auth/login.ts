import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTE_AFTER_AUTH } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
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
      return authGateway.login({
        login: form.login,
        password: form.password,
        remember: form.remember,
      });
    },
    {
      onMutate: async () => {
        await authGateway.csrfCookie();
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
