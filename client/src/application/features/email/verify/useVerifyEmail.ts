import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTE_AFTER_AUTH } from '~/routes';
import { ServerResponse } from '~/infrastructure/serverApi/types';
import { emailApi } from '~/infrastructure/serverApi/v1/email/api';
import { ResponseMessageEventHandlers } from '~/application/managers/queryClient/types';
import { delay } from '~/application/utilities/general';

export function useVerifyEmail(args?: ResponseMessageEventHandlers) {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { mutate, isLoading } = useMutation(
    () =>
      emailApi.verify({
        id: params.id || '',
        hash: params.hash || '',
        expires: searchParams.get('expires') || '',
        signature: searchParams.get('signature') || '',
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
        navigate(ROUTE_AFTER_AUTH);
      },
    },
  );

  return {
    initiate: mutate,
    isLoading,
  };
}
