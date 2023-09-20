import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface OnSuccess {
  alreadyLoggedIn: boolean;
}

interface UseLoginArgs {
  onError?: (message: ServerResponseMessage | null) => void;
  onSuccess?: (args: OnSuccess) => void;
}

export function useLogin(args?: UseLoginArgs) {
  const router = useRouter();

  const mutation = useMutation(
    (form: LoginForm) => {
      return authGateway.login({
        email: form.email,
        password: form.password,
        remember: form.remember,
      });
    },
    {
      onMutate: async () => {
        await authGateway.csrfCookie();
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.({
          alreadyLoggedIn:
            response.message === ServerResponseMessage.AlreadyLoggedIn,
        });
        router.push(PRIVATE_ROUTES.home());
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
