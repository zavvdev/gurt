import Link from 'next/link';
import { PUBLIC_ROUTES } from '~/routes';
import { notificationService } from '~/core/services/NotificationService';
import { useLogin } from '~/core/features/auth/login';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { Button } from '~/presentation/shared/Button/Button';
import { Checkbox } from '~/presentation/shared/Checkbox/Checkbox';
import { Input } from '~/presentation/shared/Input/Input';
import { useForm } from '~/presentation/pages/Auth/Login/hooks/useForm';
import { TextError } from '~/presentation/shared/TextError/TextError';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function Login() {
  const { t } = useTranslation('auth');

  const login = useLogin({
    onError: () => {
      notificationService.error(t('login.error.fallback'));
    },
  });

  const form = useForm({
    onSubmit: login.initiate,
  });

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('login.label')}
        </h2>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <div>
            <Input
              variant="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isError={Boolean(form.getError('email'))}
              placeholder={t('login.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <TextError size="small" className="mt-1">
                {form.getError('email')}
              </TextError>
            )}
          </div>
          <div>
            <Input
              type="password"
              variant="large"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isError={Boolean(form.getError('password'))}
              placeholder={t('login.form.password')}
              autoComplete="none"
            />
            {Boolean(form.getError('password')) && (
              <TextError size="small" className="mt-1">
                {form.getError('password')}
              </TextError>
            )}
          </div>
          <div className="flex justify-between items-center flex-wrap gap-1">
            <Checkbox
              size="small"
              id="rememberMe"
              isChecked={form.values.remember}
              onChange={() =>
                form.setFieldValue('remember', !form.values.remember)
              }
            >
              {t('login.form.rememberMe')}
            </Checkbox>
            <Link
              className="link text-sm"
              href={PUBLIC_ROUTES.auth.forgotPassword()}
            >
              {t('login.form.forgotPassword')}
            </Link>
          </div>
          <Button
            fullWidth
            size="large"
            leftAdornment={login.isLoading && <Loader color="white" />}
            onClick={(e) => {
              if (!login.isLoading) {
                e.preventDefault();
                form.handleSubmit();
              }
            }}
          >
            {t('login.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
