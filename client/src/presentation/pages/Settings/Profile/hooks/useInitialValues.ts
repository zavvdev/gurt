import { useMemo } from 'react';
import { UpdateProfileForm } from '~/application/features/user/updateProfile';
import { useProfileByUserIdQuery } from '~/application/managers/queryClient/queries/profiles/useProfileByUserIdQuery';
import { useUserFromSessionQuery } from '~/application/managers/queryClient/queries/users/useUserFromSessionQuery';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function useInitialValues() {
  const { t } = useTranslation('common');

  const sessionUserQuery = useUserFromSessionQuery({
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
      image: profile?.image_url
        ? {
            uid: '-1',
            name: profile.image_url,
            status: 'done',
            url: profile.image_url,
          }
        : null,

      backgroundImage: profile?.background_image_url
        ? {
            uid: '-2',
            name: profile.background_image_url,
            status: 'done',
            url: profile.background_image_url,
          }
        : null,

      name: sessionUser?.name || '',

      username: sessionUser?.username || '',

      bio: profile?.bio || null,

      country: profile?.country || null,

      dateOfBirth: profile?.date_of_birth
        ? new Date(profile.date_of_birth)
        : null,
    }),
    [
      profile?.background_image_url,
      profile?.bio,
      profile?.country,
      profile?.date_of_birth,
      profile?.image_url,
      sessionUser?.name,
      sessionUser?.username,
    ],
  );

  return {
    data,
    isLoading: sessionUserQuery.isLoading || sessionUserQuery.isLoading,
    refetch: () => {
      sessionUserQuery.refetch();
      profileQuery.refetch();
    },
  };
}
