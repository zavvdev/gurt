import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import {
  ExtractedValidationError,
  ServerResponseMessage,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { extractValidationErrors } from '~/infrastructure/serverGateway/utilities';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth1/gateway';

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseRegisterArgs {
  onError?: (args: {
    validationErrors?: ExtractedValidationError[];
    message?: ServerResponseMessage;
  }) => void;
  onSuccess?: () => void;
}

export function useRegister(args?: UseRegisterArgs) {
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
      onSuccess: (response) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.({
            message: response.message,
          });
        } else {
          args?.onSuccess?.();
          router.push(PRIVATE_ROUTES.home());
        }
      },
      onError: (e: ServerValidationErrorsResponse) => {
        args?.onError?.({
          validationErrors: extractValidationErrors(e),
        });
      },
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
