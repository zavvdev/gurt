import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '~/infrastructure/serverGateway/v1/AuthApi';
import { PRIVATE_ROUTES } from '~/routes';

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseRegisterArgs {
  onSuccess: () => void;
  onError: () => void;
}

export function useRegister({ onSuccess, onError }: UseRegisterArgs) {
  const router = useRouter();

  const mutation = useMutation(
    (form: RegisterForm) => {
      return authApi.register({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirm,
      });
    },
    {
      onMutate: async () => {
        await authApi.csrfCookie();
      },
      onError,
      onSuccess: async () => {
        onSuccess();
        await authApi.sendEmailVerification();
        router.push(PRIVATE_ROUTES.verifyEmail());
      },
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
