import { useProfileByUserIdQuery } from '~/application/managers/queryClient/queries/profile/useProfileByUserIdQuery';
import { useUserFromSessionQuery } from '~/application/managers/queryClient/queries/user/useUserFromSessionQuery';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { UserLayout } from '~/presentation/layouts/User/UserLayout';

export function Profile() {
  const { t } = useTranslation('profile');
  const user = useUserFromSessionQuery();

  const profile = useProfileByUserIdQuery({
    userId: user.data?.data?.id || 0,
    enabled: Boolean(user.data?.data?.id),
    errorNotification: notificationService.createNotification(
      'error',
      t('error.fetch'),
    ),
  });

  const isLoading = user.isLoading || profile.isLoading;

  return (
    <UserLayout>
      <div>
        {isLoading ? 'Loading... ' : JSON.stringify(profile.data?.data)}
      </div>
    </UserLayout>
  );
}
