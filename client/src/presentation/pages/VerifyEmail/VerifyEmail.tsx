import { useTranslation } from '~/presentation/i18n/useTranslation';
import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { Button } from '~/presentation/shared/Button/Button';

export function VerifyEmail() {
  const { t } = useTranslation('auth');

  return (
    <UserLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-3 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('emailVerify.label')}
        </h2>
        <p className="mb-10 w-80 text-center">{t('emailVerify.description')}</p>
        <Button fullWidth size="large" onClick={console.log}>
          {t('emailVerify.resend')}
        </Button>
      </div>
    </UserLayout>
  );
}
