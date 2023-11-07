import { useMemo } from 'react';
import { UpdateProfileForm } from '~/application/features/sessionUser/updateData';
import { useProfileByUserIdQuery } from '~/application/managers/queryClient/queries/users/useUserProfileQuery';
import { useMyUserQuery } from '~/application/managers/queryClient/queries/sessionUser/useSessionUserQuery';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function useInitialValues() {
  const { t } = useTranslation('common');

  const sessionUserQuery = useMyUserQuery({
    onError: () => {
      notificationService.error(t('error.fetchUser'));
    },
  });

  const sessionUser = sessionUserQuery.data?.data || null;

  const profileQuery = useProfileByUserIdQuery({
    userId: sessionUser?.id || 0,
    options: {
      enabled: Boolean(sessionUser?.id),
      onError: () => {
        notificationService.error(t('error.fetchUser'));
      },
    },
  });

  const profile = profileQuery.data?.data || null;

  const data: UpdateProfileForm = useMemo(
    () => ({
      bio: profile?.bio || null,
      country: profile?.country || null,
      dateOfBirth: profile?.date_of_birth
        ? new Date(profile.date_of_birth)
        : null,
    }),
    [profile?.bio, profile?.country, profile?.date_of_birth],
  );

  return {
    data,
    isLoading: sessionUserQuery.isLoading || sessionUserQuery.isLoading,
    refetch: profileQuery.refetch,
  };
}
