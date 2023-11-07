import { useParams } from 'react-router-dom';
import { ServerResponseMessage } from '~/infrastructure/serverApi/types';
import { useUserProfileQuery } from '~/application/managers/queryClient/queries/users/useUserProfileQuery';
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

  const profile = useUserProfileQuery({
    userId: userById.data?.data?.id || sessionUser.data?.data?.id || 0,
    options: {
      enabled: Boolean(userById.data?.data?.id || sessionUser.data?.data?.id),
      onError: () => {
        args.onError();
      },
    },
  });

  const userData = params?.id ? userById.data?.data : sessionUser.data?.data;
  const profileData = profile.data?.data;

  return {
    data: {
      name: userData?.name || null,
      username: userData?.username || null,
      imageUrl: profileData?.image_url || null,
      backgroundImageUrl: profileData?.background_image_url || null,
      bio: profileData?.bio || null,
      dateOfBirth: profileData?.date_of_birth || null,
      country: profileData?.country || null,
    },
    isLoading: profile.isLoading,
  };
}
