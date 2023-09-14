import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/auth';
import { PRIVATE_ROUTES } from '~/routes';

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseRegisterArgs {
  onError?: () => void;
  onSuccess?: () => void;
}

export function useRegister({ onError, onSuccess }: UseRegisterArgs) {
  const router = useRouter();

  const mutation = useMutation(
    (form: RegisterForm) => {
      return authGateway.register({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirm,
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
