import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authGateway } from '~/infrastructure/serverGateway/v1/auth/gateway';
import { PUBLIC_ROUTES } from '~/routes';

interface UseLogoutArgs {
  onError?: () => void;
}

export function useLogout({ onError }: UseLogoutArgs) {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    () => {
      return authGateway.logout();
    },
    {
      onError: () => {
        onError?.();
      },
      onSuccess: () => {
        router.replace(PUBLIC_ROUTES.auth.login());
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
