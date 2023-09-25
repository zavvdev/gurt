import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { PRIVATE_ROUTES } from '~/routes';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { emailGateway } from '~/infrastructure/serverGateway/v1/email/gateway';
import { MutationEvents } from '~/application/managers/queryClient/types';
import { delay } from '~/application/utilities/general';

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
  const navigate = useNavigate();

  const params = useParams({
    from: PRIVATE_ROUTES.verifyEmail(),
  });

  const searchParams = useSearch({
    from: PRIVATE_ROUTES.verifyEmail(),
  });

  const { mutate, isLoading } = useMutation(
    () =>
      emailGateway.verify({
        id: params.id || '',
        hash: params.hash || '',
        expires: searchParams.expires || '',
        signature: searchParams.signature || '',
      }),
    {
      onMutate: async () => {
        await delay(2000);
      },
      onError: (response: ServerResponse) => {
        args?.onError?.(response.message);
      },
      onSuccess: (response: ServerResponse) => {
        args?.onSuccess?.(response.message);
        navigate({
          to: PRIVATE_ROUTES.home(),
        });
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
