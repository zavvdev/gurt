import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout.view';

export function RegisterView() {
  const { t } = useTranslation('auth');

  return (
    <GuestLayout>
      <div>{t('register.label')}</div>
    </GuestLayout>
  );
}
