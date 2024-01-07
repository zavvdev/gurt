import { useMutation } from '@tanstack/react-query';
import {
  ExtractedValidationError,
  ServerResponseMessage,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { extractValidationErrors } from '~/infrastructure/serverApi/utilities';
import { commonApi } from '~/infrastructure/serverApi/v1/common';
import { ChangeEmailForm } from '~/application/features/account/types';
import { delay } from '~/application/utilities/general';

interface UseChangeEmailArgs {
  onError?: (args: {
    validationErrors?: ExtractedValidationError[];
    message?: ServerResponseMessage | null;
  }) => void;
  onSuccess?: () => void;
}

export function useChangeEmail(args?: UseChangeEmailArgs) {
  const mutation = useMutation(
    (form: ChangeEmailForm) => {
      return sessionUserApi.changeEmail({
        password: form.currentPassword,
        new_email: form.newEmail,
      });
    },
    {
      onSuccess: () => {
        args?.onSuccess?.();
        delay(1000).then(() => {
          commonApi.ping();
        });
      },
      onError: (e: ServerValidationErrorsResponse) => {
        args?.onError?.({
          validationErrors: extractValidationErrors(e),
          message: e.message,
        });
      },
    },
  );

  return {
    initiate: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}
