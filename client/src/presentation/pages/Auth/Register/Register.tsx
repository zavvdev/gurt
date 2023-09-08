import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';

export function Register() {
  const { t } = useTranslation('auth');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdConfirm, setPasswdConfirm] = useState('');

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10 max-sm:text-3xl w-96 text-center">
          {t('register.label')}
        </h2>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Input
              variant="large"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('register.form.firstName')}
            />
            <Input
              variant="large"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t('register.form.lastName')}
            />
          </div>
          <Input
            variant="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('register.form.email')}
          />
          <Input
            type="password"
            variant="large"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            placeholder={t('register.form.password')}
            autoComplete="none"
          />
          <Input
            type="password"
            variant="large"
            value={passwdConfirm}
            onChange={(e) => setPasswdConfirm(e.target.value)}
            placeholder={t('register.form.confirmPassword')}
            autoComplete="none"
          />
          <Button fullWidth size="large" onClick={console.log}>
            {t('register.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
