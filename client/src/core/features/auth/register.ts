import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import {
  ExtractedValidationError,
  ServerResponseMessage,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { extractValidationErrors } from '~/infrastructure/serverGateway/utilities';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface OnSuccess {
  alreadyLoggedIn: boolean;
}

interface UseRegisterArgs {
  onError?: (validationErrors: ExtractedValidationError[]) => void;
  onSuccess?: (args: OnSuccess) => void;
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
        args?.onSuccess?.({
          alreadyLoggedIn:
            response.message === ServerResponseMessage.AlreadyLoggedIn,
        });
        router.push(PRIVATE_ROUTES.home());
      },
      onError: (e: ServerValidationErrorsResponse) => {
        args?.onError?.(extractValidationErrors(e));
      },
    },
  );

  return {
    initiate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
