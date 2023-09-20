import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PUBLIC_ROUTES } from '~/routes';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { MutationEvents } from '~/core/managers/queryClient/types';

export function useLogout(args?: MutationEvents) {
  const router = useRouter();

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
        router.replace(PUBLIC_ROUTES.auth.login());
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
