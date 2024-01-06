import { useMutation } from '@tanstack/react-query';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { ChangePasswordForm } from '~/application/features/account/types';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useChangePassword(args?: ResponseMessageEventHandlers) {
  const mutation = useMutation(
    (form: ChangePasswordForm) => {
      return sessionUserApi.changePassword({
        old_password: form.currentPassword,
        new_password: form.newPassword,
        new_password_confirmation: form.newPasswordConfirm,
      });
    },
    {
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
    },
  );

  return {
    initiate: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}
