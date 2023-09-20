import { useResetPassword } from '~/core/features/auth/password';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';
import { useForm } from '~/presentation/pages/Auth/ResetPassword/hooks/useForm';
import { TextError } from '~/presentation/shared/TextError/TextError';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function ResetPassword() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('auth');

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
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('resetPassword.label')}
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
              placeholder={t('resetPassword.form.email')}
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
              placeholder={t('resetPassword.form.password')}
              autoComplete="none"
            />
            {Boolean(form.getError('password')) && (
              <TextError size="small" className="mt-1">
                {form.getError('password')}
              </TextError>
            )}
          </div>
          <div>
            <Input
              type="password"
              variant="large"
              name="passwordConfirm"
              value={form.values.passwordConfirm}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isError={Boolean(form.getError('passwordConfirm'))}
              placeholder={t('resetPassword.form.confirmPassword')}
              autoComplete="none"
            />
            {Boolean(form.getError('passwordConfirm')) && (
              <TextError size="small" className="mt-1">
                {form.getError('passwordConfirm')}
              </TextError>
            )}
          </div>
          <Button
            fullWidth
            size="large"
            leftAdornment={resetPassword.isLoading && <Loader color="white" />}
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
