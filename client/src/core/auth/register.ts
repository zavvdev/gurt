import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { User } from '~/entities/api/User';
import { authGateway } from '~/infrastructure/serverGateway/v1/Auth/Auth';
import { PRIVATE_ROUTES } from '~/routes';

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseRegisterArgs {
  onError: () => void;
  onSendEmailVerificationError: () => void;
}

export function useRegister({
  onError,
  onSendEmailVerificationError,
}: UseRegisterArgs) {
  const router = useRouter();

  const onSuccess = (user: User) => {
    if (user.email_verified_at) {
      router.push(PRIVATE_ROUTES.home());
    } else {
      authGateway
        .sendEmailVerification()
        .catch(onSendEmailVerificationError)
        .then(() => {
          router.push(PRIVATE_ROUTES.verifyEmail());
        });
    }
  };

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
      onError,
      onSuccess,
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
