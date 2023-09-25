import { Button, Typography } from 'antd';
import { useLogout } from '~/application/features/auth/logout';
import { useSendEmailVerification } from '~/application/features/email/verify';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Icons } from '~/presentation/assets/Icons';

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
        <Icons.MailWarning className="w-24 h-24 mb-4 text-gray-300 dark:text-slate-700" />
        <Typography.Title
          level={2}
          className="text-4xl font-bold mb-3 max-sm:text-3xl w-96 max-sm:w-full text-center"
        >
          {t('emailVerify.resend.label')}
        </Typography.Title>
        <Typography.Text type="secondary" className="mb-10 w-80 text-center">
          {t('emailVerify.resend.description')}
        </Typography.Text>
        <Button
          type="primary"
          size="large"
          onClick={onResend}
          className="max-sm:w-full"
          loading={sendEmailVerification.isLoading}
        >
          {t('emailVerify.resend.resend')}
        </Button>
        <Button
          type="link"
          className="mt-5 flex items-center gap-2"
          onClick={onLogout}
          loading={logout.isLoading}
        >
          {t('emailVerify.logout')}
        </Button>
      </div>
    </EmptyLayout>
  );
}
