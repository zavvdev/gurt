import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';

export function ForgotPassword() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-3 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('forgotPassword.label')}
        </h2>
        <p className="mb-10 w-80 text-center">
          {t('forgotPassword.description')}
        </p>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <Input
            variant="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('forgotPassword.form.email')}
          />
          <Button fullWidth size="large" onClick={console.log}>
            {t('forgotPassword.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
