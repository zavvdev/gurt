import { Button, Input, Typography } from 'antd';
import { useRegister } from '~/application/features/auth/register';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useForm } from '~/presentation/pages/Auth/Register/hooks/useForm';
import { Icons } from '~/presentation/assets/Icons';

export function Register() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');

  const register = useRegister({
    onError: ({ validationErrors, message }) => {
      const field = validationErrors?.[0]?.field || 0;
      const key = validationErrors?.[0]?.errorKeys?.[0] || null;
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
    onSubmit: register.initiate,
  });

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <Typography.Title>{t('register.label')}</Typography.Title>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
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
              <Typography.Text type="danger" className="mt-1">
                {form.getError('name')}
              </Typography.Text>
            )}
          </div>
          <div>
            <Input
              size="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              status={form.getError('email') ? 'error' : undefined}
              placeholder={t('register.form.email')}
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
              status={form.getError('password') ? 'error' : undefined}
              iconRender={(visible) =>
                visible ? (
                  <Icons.Eye size="1rem" color={'gray'} />
                ) : (
                  <Icons.EyeOff size="1rem" color={'gray'} />
                )
              }
              placeholder={t('register.form.password')}
              autoComplete="none"
            />
            {Boolean(form.getError('password')) && (
              <Typography.Text type="danger" className="mt-1">
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
                  <Icons.Eye size="1rem" color={'gray'} />
                ) : (
                  <Icons.EyeOff size="1rem" color={'gray'} />
                )
              }
              placeholder={t('register.form.confirmPassword')}
              autoComplete="none"
            />
            {Boolean(form.getError('passwordConfirm')) && (
              <Typography.Text type="danger" className="mt-1">
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
