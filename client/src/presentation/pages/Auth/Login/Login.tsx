import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';

export function LoginView() {
  const { t } = useTranslation('auth');

  return (
    <GuestLayout>
      <div>{t('login.label')}</div>
    </GuestLayout>
  );
}
