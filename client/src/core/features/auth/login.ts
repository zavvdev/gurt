import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth1/gateway';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { MutationEvents } from '~/core/managers/queryClient/types';

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export function useLogin(args?: MutationEvents) {
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
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.(response.message);
        } else {
          args?.onSuccess?.(response.message);
          router.push(PRIVATE_ROUTES.home());
        }
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
