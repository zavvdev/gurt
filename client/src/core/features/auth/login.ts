import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface UseLoginArgs {
  onError?: () => void;
  onSuccess?: () => void;
}

export function useLogin({ onError, onSuccess }: UseLoginArgs) {
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
      onSuccess: () => {
        onSuccess?.();
        router.push(PRIVATE_ROUTES.home());
      },
      onError: () => {
        onError?.();
      },
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
