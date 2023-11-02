import { PatchProfileForm } from '~/application/features/user/patchProfile';
import { useProfileByUserIdQuery } from '~/application/managers/queryClient/queries/profile/useProfileByUserIdQuery';
import { useUserFromSessionQuery } from '~/application/managers/queryClient/queries/user/useUserFromSessionQuery';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function useInitialValues(): {
  initialValues: PatchProfileForm;
  isLoading: boolean;
} {
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

  return {
    initialValues: {
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

      dateOfBirth: profile?.date_of_birth || null,
    },
    isLoading: sessionUserQuery.isLoading || sessionUserQuery.isLoading,
  };
}