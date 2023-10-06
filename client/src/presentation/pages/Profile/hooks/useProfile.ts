import { useParams } from 'react-router-dom';
import { useProfileByUserIdQuery } from '~/application/managers/queryClient/queries/profile/useProfileByUserIdQuery';
import { useUserFromSessionQuery } from '~/application/managers/queryClient/queries/user/useUserFromSessionQuery';
import { useUserQuery } from '~/application/managers/queryClient/queries/user/useUserQuery';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function useProfile() {
  const { t } = useTranslation('profile');
  const params = useParams();

  const sessionUser = useUserFromSessionQuery({
    enabled: !params?.id,
  });

  const userById = useUserQuery({
    id: Number(params?.id),
    options: {
      enabled: Boolean(params?.id),
    },
  });

  const profile = useProfileByUserIdQuery({
    userId: params?.id ? Number(params.id) : sessionUser.data?.data?.id || 0,
    options: {
      enabled: Boolean(params?.id || sessionUser.data?.data?.id),
      errorNotification: notificationService.createNotification(
        'error',
        t('error.fetch'),
      ),
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
      city: profileData?.city || null,
    },
    isLoading: profile.isLoading,
  };
}
