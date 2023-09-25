import { Button, Input, Typography } from 'antd';
import { useForgotPassword } from '~/application/features/auth/password';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { useForm } from '~/presentation/pages/Auth/ForgotPassword/hooks/useForm';

export function ForgotPassword() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');

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
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <Typography.Title>{t('forgotPassword.label')}</Typography.Title>
        <Typography.Text type="secondary" className="mb-7 w-80 text-center">
          {t('forgotPassword.description')}
        </Typography.Text>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
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
              <Typography.Text type="danger" className="mt-1">
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
