import { useLogout } from '~/core/features/auth/logout';
import { useSendEmailVerification } from '~/core/features/email/verify';
import { notificationService } from '~/core/services/NotificationService';
import { Svg } from '~/presentation/assets/Svg';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function ResendVerifyEmail() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('common');

  const logout = useLogout({
    onError: () => {
      t('error.logout');
    },
  });

  const sendEmailVerification = useSendEmailVerification({
    onError: (message) => {
      notificationService.error(
        tCommon(
          `serverMessage.${message}`,
          t('emailVerify.resend.error.fallback'),
        ),
      );
    },
    onSuccess: (message) => {
      notificationService.success(
        t([
          `emailVerify.resend.success.serverMessage.${message}`,
          'emailVerify.resend.success.fallback',
        ]),
      );
    },
  });

  const onResend = () => {
    if (!sendEmailVerification.isLoading) {
      sendEmailVerification.initiate();
    }
  };

  const onLogout = () => {
    if (!logout.isLoading) {
      logout.initiate();
    }
  };

  return (
    <EmptyLayout className="flex justify-center">
      <div className="flex items-center justify-center pt-24 max-md:pt-10 max-md:pb-20 flex-col w-96 max-md:w-full">
        <Svg.EnvelopeInfo className="w-24 h-24 mb-4 text-gray-300 dark:text-slate-700" />
        <h2 className="text-4xl font-bold mb-3 max-sm:text-3xl w-96 max-sm:w-full text-center">
          {t('emailVerify.resend.label')}
        </h2>
        <p className="mb-10 w-80 text-center">
          {t('emailVerify.resend.description')}
        </p>
        <Button
          size="large"
          onClick={onResend}
          className="max-sm:w-full"
          leftAdornment={
            sendEmailVerification.isLoading && <Loader color="white" />
          }
        >
          {t('emailVerify.resend.resend')}
        </Button>
        <button
          className="link mt-5 flex items-center gap-2"
          onClick={onLogout}
        >
          {logout.isLoading && <Loader size="small" color="link" />}{' '}
          {t('emailVerify.logout')}
        </button>
      </div>
    </EmptyLayout>
  );
}
