import { useParams } from 'react-router-dom';
import { ServerResponseMessage } from '~/infrastructure/serverApi/types';
import { useSessionUserQuery } from '~/application/managers/queryClient/queries/sessionUser/useSessionUserQuery';
import { useUserQuery } from '~/application/managers/queryClient/queries/users/useUserQuery';

interface UseProfileArgs {
  onError: (message?: ServerResponseMessage | null) => void;
}

export function useProfile(args: UseProfileArgs) {
  const params = useParams();

  const sessionUser = useSessionUserQuery({
    enabled: !params?.id,
    onError: () => {
      args.onError();
    },
  });

  const userById = useUserQuery({
    id: Number(params?.id),
    options: {
      enabled: Boolean(params?.id),
      onError: (message) => {
        args.onError(message);
      },
    },
  });

  const userData = params?.id ? userById.data?.data : sessionUser.data?.data;
  const isLoading = params?.id ? userById.isLoading : sessionUser.isLoading;

  return {
    data: {
      name: userData?.name || null,
      username: userData?.username || null,
      imageUrl: userData?.profile?.image_url || null,
      backgroundImageUrl: userData?.profile?.background_image_url || null,
      bio: userData?.profile?.bio || null,
      dateOfBirth: userData?.profile?.date_of_birth || null,
      country: userData?.profile?.country || null,
    },
    isLoading,
  };
}
