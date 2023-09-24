import Link from 'next/link';
import { Button, Checkbox, Input, Typography } from 'antd';
import { PUBLIC_ROUTES, useCreateRoute } from '~/routes';
import { notificationService } from '~/core/services/NotificationService';
import { useLogin } from '~/core/features/auth/login';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { useForm } from '~/presentation/pages/Auth/Login/hooks/useForm';
import { Icons } from '~/presentation/shared/Icons';
import { useAppTheme } from '~/presentation/styles/theme';

export function Login() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');
  const { r } = useCreateRoute();
  const theme = useAppTheme();

  const login = useLogin({
    onError: (message) => {
      notificationService.error(
        tCommon(
          `serverMessage.${message}`,
          t([`login.error.serverMessage.${message}`, 'login.error.fallback']),
        ),
      );
    },
  });

  const form = useForm({
    onSubmit: login.initiate,
  });

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <Typography.Title>{t('login.label')}</Typography.Title>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <div>
            <Input
              size="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={Boolean(form.getError('email')) ? 'error' : undefined}
              placeholder={t('login.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <Typography.Text type="danger" className="mt-1">
                {form.getError('email')}
              </Typography.Text>
            )}
          </div>
          <div>
            <Input.Password
              size="large"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={Boolean(form.getError('password')) ? 'error' : undefined}
              iconRender={(visible) =>
                visible ? (
                  <Icons.Eye size="1rem" color={theme.color.gray6} />
                ) : (
                  <Icons.EyeOff size="1rem" color={theme.color.gray6} />
                )
              }
              placeholder={t('login.form.password')}
              autoComplete="none"
            />
            {Boolean(form.getError('password')) && (
              <Typography.Text type="danger" className="mt-1">
                {form.getError('password')}
              </Typography.Text>
            )}
          </div>
          <div className="flex justify-between items-center flex-wrap gap-1">
            <Checkbox
              id="rememberMe"
              checked={form.values.remember}
              onChange={() =>
                form.setFieldValue('remember', !form.values.remember)
              }
            >
              {t('login.form.rememberMe')}
            </Checkbox>
            <Link
              className="link text-sm"
              href={r(PUBLIC_ROUTES.auth.forgotPassword())}
            >
              {t('login.form.forgotPassword')}
            </Link>
          </div>
          <Button
            type="primary"
            size="large"
            loading={login.isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (!login.isLoading) {
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
