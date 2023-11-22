import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTE_AFTER_AUTH } from '~/routes';
import {
  ExtractedValidationError,
  ServerResponseMessage,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { extractValidationErrors } from '~/infrastructure/serverApi/utilities';
import { authApi } from '~/infrastructure/serverApi/v1/auth/api';
import { RegisterForm } from '~/application/features/auth/register/types';

interface UseRegisterArgs {
  onError?: (args: {
    validationErrors?: ExtractedValidationError[];
    message?: ServerResponseMessage;
  }) => void;
  onSuccess?: () => void;
}

export function useRegister(args?: UseRegisterArgs) {
  const navigate = useNavigate();

  const mutation = useMutation(
    (form: RegisterForm) => {
      return authApi.register({
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        password_confirmation: form.passwordConfirm,
      });
    },
    {
      onMutate: async () => {
        await authApi.csrfCookie();
      },
      onSuccess: (response) => {
        if (response.message === ServerResponseMessage.AlreadyLoggedIn) {
          args?.onError?.({
            message: response.message,
          });
        } else {
          args?.onSuccess?.();
        }
        navigate(ROUTE_AFTER_AUTH);
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
