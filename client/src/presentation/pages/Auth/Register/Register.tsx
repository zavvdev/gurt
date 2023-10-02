import { Button, Input, Typography } from 'antd';
import { useState } from 'react';
import { useRegister } from '~/application/features/auth/register';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useForm } from '~/presentation/pages/Auth/Register/hooks/useForm';
import { Icons } from '~/presentation/assets/Icons';
import { useRegisterStyles } from '~/presentation/pages/Auth/Register/Register.styles';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';

export function Register() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');
  const classes = useRegisterStyles();
  const { theme } = useJssTheme();
  const [alreadyUsed, setAlreadyUsed] = useState<string | null>(null);

  const register = useRegister({
    onError: ({ validationErrors, message }) => {
      const field = validationErrors?.[0]?.field || '-';
      const key = validationErrors?.[0]?.errorKeys?.[0] || null;

      if (key === 'already_exists') {
        setAlreadyUsed(field);
      }

      notificationService.error(
        tCommon(
          `serverMessage.${message}`,
          t([
            `register.error.serverValidation.${field}.${key}`,
            'register.error.fallback',
          ]),
        ),
      );
    },
  });

  const form = useForm({
    onSubmit: (values) => {
      setAlreadyUsed(null);
      register.initiate(values);
    },
  });

  return (
    <GuestLayout>
      <div className={classes.root}>
        <Typography.Title level={2}>{t('register.label')}</Typography.Title>
        <form className={classes.form}>
          <div>
            <Input
              size="large"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('name') ? 'error' : undefined}
              placeholder={t('register.form.name')}
            />
            {Boolean(form.getError('name')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('name')}
              </Typography.Text>
            )}
          </div>
          <div>
            <Input
              size="large"
              name="email"
              value={form.values.email}
              onChange={(e) => {
                setAlreadyUsed(null);
                form.handleChange(e);
              }}
              onBlur={form.handleBlur}
              status={
                form.getError('email') || alreadyUsed === 'email'
                  ? 'error'
                  : undefined
              }
              placeholder={t('register.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('email')}
              </Typography.Text>
            )}
          </div>
          <div>
            <Input
              size="large"
              name="username"
              value={form.values.username}
              onChange={(e) => {
                setAlreadyUsed(null);
                form.handleChange(e);
              }}
              onBlur={form.handleBlur}
              status={
                form.getError('username') || alreadyUsed === 'username'
                  ? 'error'
                  : undefined
              }
              placeholder={t('register.form.username')}
              prefix={<Icons.AtSign width={17} color={theme.color.gray6} />}
            />
            {Boolean(form.getError('username')) && (
              <Typography.Text type="danger" className={classes.formError}>
                {form.getError('username')}
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
              placeholder={t('register.form.password')}
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
              placeholder={t('register.form.confirmPassword')}
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
            loading={register.isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (!register.isLoading) {
                form.handleSubmit();
              }
            }}
          >
            {t('register.form.submit')}
          </Button>
        </form>
      </div>
    </GuestLayout>
  );
}
