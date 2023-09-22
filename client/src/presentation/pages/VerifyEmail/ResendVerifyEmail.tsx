import { Button, Spin, Typography } from 'antd';
import { useLogout } from '~/core/features/auth/logout';
import { useSendEmailVerification } from '~/core/features/email/verify';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Icons } from '~/presentation/shared/Icons';

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
        <Typography.Text className="mb-10 w-80 text-center">
          {t('emailVerify.resend.description')}
        </Typography.Text>
        <Button
          size="large"
          onClick={onResend}
          className="max-sm:w-full"
          icon={sendEmailVerification.isLoading && <Spin />}
        >
          {t('emailVerify.resend.resend')}
        </Button>
        <Button
          type="text"
          className="mt-5 flex items-center gap-2"
          onClick={onLogout}
        >
          {logout.isLoading && <Spin size="small" />} {t('emailVerify.logout')}
        </Button>
      </div>
    </EmptyLayout>
  );
}
