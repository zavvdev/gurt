import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';

export function LoginView() {
  const { t } = useTranslation('auth');

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-20 flex-col">
        <h2 className="text-4xl font-bold mb-10">{t('login.label')}</h2>
        <div className="w-[300px]">
          <Button fullWidth size="large" onClick={console.log}>
            {t('login.form.submit')}
          </Button>
        </div>
      </div>
    </GuestLayout>
  );
}
