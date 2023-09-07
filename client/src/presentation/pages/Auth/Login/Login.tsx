import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { ROUTES } from '~/presentation/routes';
import { Button } from '~/presentation/shared/Button/Button';
import { Checkbox } from '~/presentation/shared/Checkbox/Checkbox';
import { Input } from '~/presentation/shared/Input/Input';

export function Login() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-20 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10">{t('login.label')}</h2>
        <div className="w-[300px] max-sm:w-[280px] flex flex-col gap-4">
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
          <div className="flex justify-between items-center flex-wrap gap-1">
            <Checkbox
              size="small"
              id="rememberMe"
              isChecked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            >
              {t('login.form.rememberMe')}
            </Checkbox>
            <Link className="link text-sm" href={ROUTES.auth.resetPassword()}>
              {t('login.form.forgotPassword')}
            </Link>
          </div>
          <Button fullWidth size="large" onClick={console.log}>
            {t('login.form.submit')}
          </Button>
        </div>
      </div>
    </GuestLayout>
  );
}
