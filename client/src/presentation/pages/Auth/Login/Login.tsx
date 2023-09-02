import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';

export function LoginView() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-20 flex-col">
        <h2 className="text-4xl font-bold mb-10">{t('login.label')}</h2>
        <div className="w-[300px] flex flex-col gap-4">
          <Input
            variant="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('login.form.email.placeholder')}
          />
          <Input
            type="password"
            variant="large"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            placeholder={t('login.form.password.placeholder')}
          />
          <Button fullWidth size="large" onClick={console.log}>
            {t('login.form.submit')}
          </Button>
        </div>
      </div>
    </GuestLayout>
  );
}
