import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';

export function useLogout(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    () => {
      return authGateway.logout();
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
