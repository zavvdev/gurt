import { Button, Checkbox, Input, Typography } from 'antd';
import { PUBLIC_ROUTES } from '~/routes';
import { notificationService } from '~/application/services/NotificationService';
import { useLogin } from '~/application/features/auth/login/useLogin';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useForm } from '~/presentation/pages/Auth/Login/hooks/useForm';
import { Icons } from '~/presentation/assets/Icons';
import { useLoginStyles } from '~/presentation/pages/Auth/Login/Login.styles';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';
import { Link } from '~/presentation/shared/Link/Link';

export function Login() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');
  const classes = useLoginStyles();
  const { theme } = useJssTheme();

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
      <div className={classes.root}>
        <Typography.Title level={2}>{t('login.label')}</Typography.Title>
        <form className={classes.form}>
          <div>
            <Input
              size="large"
              name="login"
              value={form.values.login}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('login') ? 'error' : undefined}
              placeholder={t('login.form.login')}
            />
            {Boolean(form.getError('login')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('login')}
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
              status={form.getError('password') ? 'error' : undefined}
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
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('password')}
              </Typography.Text>
            )}
          </div>
          <div className={classes.actions}>
            <Checkbox
              id="rememberMe"
              checked={form.values.remember}
              onChange={() =>
                form.setFieldValue('remember', !form.values.remember)
              }
            >
              {t('login.form.rememberMe')}
            </Checkbox>
            <Link to={PUBLIC_ROUTES.auth.forgotPassword()}>
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
