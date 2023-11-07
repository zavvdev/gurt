import { useMemo } from 'react';
import { useUserProfileQuery } from '~/application/managers/queryClient/queries/users/useUserProfileQuery';
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

  const profileQuery = useUserProfileQuery({
    userId: sessionUser?.id || 0,
    options: {
      enabled: Boolean(sessionUser?.id),
      onError: () => {
        args.onError();
      },
    },
  });

  const profile = profileQuery.data?.data || null;

  const data: ProfileSettingsForm = useMemo(
    () => ({
      name: sessionUser?.name || '',
      username: sessionUser?.username || '',
      bio: profile?.bio || null,
      country: profile?.country || null,
      dateOfBirth: profile?.date_of_birth
        ? new Date(profile.date_of_birth)
        : null,
    }),
    [
      profile?.bio,
      profile?.country,
      profile?.date_of_birth,
      sessionUser?.name,
      sessionUser?.username,
    ],
  );

  return {
    data,
    isLoading: sessionUserQuery.isLoading || sessionUserQuery.isLoading,
    refetch: profileQuery.refetch,
  };
}
