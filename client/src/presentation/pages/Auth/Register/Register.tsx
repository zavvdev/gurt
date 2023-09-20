import { useRegister } from '~/core/features/auth/register';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { GuestLayout } from '~/presentation/layouts/Guest/GuestLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Input } from '~/presentation/shared/Input/Input';
import { useForm } from '~/presentation/pages/Auth/Register/hooks/useForm';
import { TextError } from '~/presentation/shared/TextError/TextError';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function Register() {
  const { t: tServerMessage } = useTranslation('serverMessage');
  const { t } = useTranslation('auth');

  const register = useRegister({
    onError: (validationErrors) => {
      const field = validationErrors?.[0]?.field || 0;
      const key = validationErrors?.[0]?.errorKeys?.[0] || null;
      notificationService.error(
        t([
          `register.error.serverValidation.${field}.${key}`,
          'register.error.fallback',
        ]),
      );
    },
    onSuccess: (message) => {
      notificationService.success(
        tServerMessage(`${message}`, t('register.success.fallback')),
      );
    },
  });

  const form = useForm({
    onSubmit: register.initiate,
  });

  return (
    <GuestLayout>
      <div className="flex items-center justify-center flex-1 pt-10 max-md:pt-5 max-md:pb-20 flex-col">
        <h2 className="text-4xl font-bold mb-10 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('register.label')}
        </h2>
        <form className="w-[350px] max-sm:w-[280px] flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <Input
                variant="large"
                name="firstName"
                value={form.values.firstName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                isError={Boolean(form.getError('firstName'))}
                placeholder={t('register.form.firstName')}
              />
              {Boolean(form.getError('firstName')) && (
                <TextError size="small" className="mt-1">
                  {form.getError('firstName')}
                </TextError>
              )}
            </div>
            <div>
              <Input
                variant="large"
                name="lastName"
                value={form.values.lastName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                isError={Boolean(form.getError('lastName'))}
                placeholder={t('register.form.lastName')}
              />
              {Boolean(form.getError('lastName')) && (
                <TextError size="small" className="mt-1">
                  {form.getError('lastName')}
                </TextError>
              )}
            </div>
          </div>
          <div>
            <Input
              variant="large"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isError={Boolean(form.getError('email'))}
              placeholder={t('register.form.email')}
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
              placeholder={t('register.form.password')}
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
              placeholder={t('register.form.confirmPassword')}
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
            leftAdornment={register.isLoading && <Loader color="white" />}
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
