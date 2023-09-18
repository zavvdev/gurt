import { useForgotPassword } from '~/core/features/auth/password';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';
import { useForm } from '~/presentation/pages/Auth/ForgotPassword/hooks/useForm';
import { TextError } from '~/presentation/shared/TextError/TextError';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function ForgotPassword() {
  const { t } = useTranslation('auth');

  const forgotPassword = useForgotPassword({
    onError: (message) => {
      notificationService.error(
        t([
          `forgotPassword.error.serverResponseMessage.${message}`,
          'forgotPassword.error.fallback',
        ]),
      );
    },
    onSuccess: (message) => {
      notificationService.success(
        t([
          `forgotPassword.success.serverResponseMessage.${message}`,
          'forgotPassword.success.fallback',
        ]),
      );
    },
  });

  const form = useForm({
    onSubmit: forgotPassword.initiate,
  });

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-3 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('forgotPassword.label')}
        </h2>
        <p className="mb-10 w-80 text-center">
          {t('forgotPassword.description')}
        </p>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <div>
            <Input
              variant="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isError={Boolean(form.getError('email'))}
              placeholder={t('forgotPassword.form.email')}
            />
            {Boolean(form.getError('email')) && (
              <TextError size="small" className="mt-1">
                {form.getError('email')}
              </TextError>
            )}
          </div>
          <Button
            fullWidth
            size="large"
            leftAdornment={forgotPassword.isLoading && <Loader color="white" />}
            onClick={(e) => {
              if (!forgotPassword.isLoading) {
                e.preventDefault();
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
