import { Button, Input, Typography } from 'antd';
import { notificationService } from '~/application/services/NotificationService';
import { useResetPassword } from '~/application/features/auth/password/useResetPassword';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useForm } from '~/presentation/pages/Auth/ResetPassword/hooks/useForm';
import { Icons } from '~/presentation/assets/Icons';
import { useResetPasswordStyles } from '~/presentation/pages/Auth/ResetPassword/ResetPassword.styles';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';

export function ResetPassword() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');
  const classes = useResetPasswordStyles();
  const { theme } = useJssTheme();

  const resetPassword = useResetPassword({
    onError: (message) => {
      notificationService.error(
        tCommon(`serverMessage.${message}`, t('resetPassword.error.fallback')),
      );
    },
    onSuccess: () => {
      notificationService.success(t('resetPassword.success.fallback'));
    },
  });

  const form = useForm({
    onSubmit: resetPassword.initiate,
  });

  return (
    <GuestLayout>
      <div className={classes.root}>
        <Typography.Title level={2}>
          {t('resetPassword.label')}
        </Typography.Title>
        <form className={classes.form}>
          <div>
            <Input
              size="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('email') ? 'error' : undefined}
              placeholder={t('resetPassword.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <Typography.Text type="danger" className={classes.formError}>
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
              status={form.getError('password') ? 'error' : undefined}
              iconRender={(visible) =>
                visible ? (
                  <Icons.Eye size="1rem" color={theme.color.gray6} />
                ) : (
                  <Icons.EyeOff size="1rem" color={theme.color.gray6} />
                )
              }
              placeholder={t('resetPassword.form.password')}
              autoComplete="none"
            />
            {Boolean(form.getError('password')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('password')}
              </Typography.Text>
            )}
          </div>
          <div>
            <Input.Password
              size="large"
              name="passwordConfirm"
              value={form.values.passwordConfirm}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('passwordConfirm') ? 'error' : undefined}
              iconRender={(visible) =>
                visible ? (
                  <Icons.Eye size="1rem" color={theme.color.gray6} />
                ) : (
                  <Icons.EyeOff size="1rem" color={theme.color.gray6} />
                )
              }
              placeholder={t('resetPassword.form.confirmPassword')}
              autoComplete="none"
            />
            {Boolean(form.getError('passwordConfirm')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('passwordConfirm')}
              </Typography.Text>
            )}
          </div>
          <Button
            type="primary"
            size="large"
            loading={resetPassword.isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (!resetPassword.isLoading) {
                form.handleSubmit();
              }
            }}
          >
            {t('resetPassword.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
