import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { emailGateway } from '~/infrastructure/serverGateway/v1/email/gateway';
import { MutationEvents } from '~/core/managers/queryClient/types';

// Send verification

export function useSendEmailVerification(args?: MutationEvents) {
  const { mutate, isLoading } = useMutation(
    () => {
      return emailGateway.sendVerification();
    },
    {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}

// Verify

export function useVerifyEmail(args?: MutationEvents) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    () =>
      emailGateway.verify({
        id: (params.id as string) || '',
        hash: (params.hash as string) || '',
        expires: searchParams.get('expires') || '',
        signature: searchParams.get('signature') || '',
      }),
    {
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
        router.push(PRIVATE_ROUTES.home());
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
