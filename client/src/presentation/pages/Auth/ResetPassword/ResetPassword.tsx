import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';

export function ResetPassword() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdConfirm, setPasswdConfirm] = useState('');

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10 max-sm:text-3xl w-96 text-center">
          {t('resetPassword.label')}
        </h2>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <Input
            variant="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('resetPassword.form.email')}
          />
          <Input
            type="password"
            variant="large"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            placeholder={t('resetPassword.form.password')}
            autoComplete="none"
          />
          <Input
            type="password"
            variant="large"
            value={passwdConfirm}
            onChange={(e) => setPasswdConfirm(e.target.value)}
            placeholder={t('resetPassword.form.confirmPassword')}
            autoComplete="none"
          />
          <Button fullWidth size="large" onClick={console.log}>
            {t('resetPassword.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
