import { useMemo } from 'react';
import { useSessionUserQuery } from '~/application/managers/queryClient/queries/sessionUser/useSessionUserQuery';
import { ProfileSettingsForm } from '~/application/features/settings/profile/types';

interface UseProfileSettingsArgs {
  onError: () => void;
}

export function useProfileSettings(args: UseProfileSettingsArgs) {
  const sessionUserQuery = useSessionUserQuery({
    onError: () => {
      args.onError();
    },
  });

  const sessionUser = sessionUserQuery.data?.data || null;

  const data: ProfileSettingsForm = useMemo(
    () => ({
      name: sessionUser?.name || '',
      username: sessionUser?.username || '',
      imageUrl: sessionUser?.profile?.image_url || null,
      backgroundImageUrl: sessionUser?.profile?.background_image_url || null,
      bio: sessionUser?.profile?.bio || null,
      country: sessionUser?.profile?.country || null,
      dateOfBirth: sessionUser?.profile?.date_of_birth
        ? new Date(sessionUser.profile?.date_of_birth)
        : null,
    }),
    [
      sessionUser?.name,
      sessionUser?.profile?.background_image_url,
      sessionUser?.profile?.bio,
      sessionUser?.profile?.country,
      sessionUser?.profile?.date_of_birth,
      sessionUser?.profile?.image_url,
      sessionUser?.username,
    ],
  );

  return {
    data,
    isLoading: sessionUserQuery.isLoading,
    refetch: sessionUserQuery.refetch,
  };
}
