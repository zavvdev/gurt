import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';

export function ResetPassword() {
  const { t } = useTranslation('auth');

  return (
    <GuestLayout>
      <div>{t('resetPassword.label')}</div>
    </GuestLayout>
  );
}
