import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/routes';
import { authApi } from '~/infrastructure/serverApi/v1/auth/api';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useLogout(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    () => {
      return authApi.logout();
    },
    {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
        navigate(PUBLIC_ROUTES.auth.login());
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
