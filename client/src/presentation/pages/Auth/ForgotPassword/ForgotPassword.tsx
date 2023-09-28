import { Button, Input, Typography } from 'antd';
import { useForgotPassword } from '~/application/features/auth/password';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useForm } from '~/presentation/pages/Auth/ForgotPassword/hooks/useForm';
import { useForgotPasswordStyles } from '~/presentation/pages/Auth/ForgotPassword/ForgotPassword.styles';

export function ForgotPassword() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');
  const classes = useForgotPasswordStyles();

  const forgotPassword = useForgotPassword({
    onError: (message) => {
      notificationService.error(
        tCommon(`serverMessage.${message}`, t('forgotPassword.error.fallback')),
      );
    },
    onSuccess: () => {
      notificationService.success(t('forgotPassword.success.fallback'));
    },
  });

  const form = useForm({
    onSubmit: forgotPassword.initiate,
  });

  return (
    <GuestLayout>
      <div className={classes.root}>
        <Typography.Title level={2}>
          {t('forgotPassword.label')}
        </Typography.Title>
        <Typography.Text type="secondary" className={classes.description}>
          {t('forgotPassword.description')}
        </Typography.Text>
        <form className={classes.form}>
          <div>
            <Input
              size="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('email') ? 'error' : undefined}
              placeholder={t('forgotPassword.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('email')}
              </Typography.Text>
            )}
          </div>
          <Button
            type="primary"
            size="large"
            loading={forgotPassword.isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (!forgotPassword.isLoading) {
                form.handleSubmit();
              }
            }}
          >
            {t('forgotPassword.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
