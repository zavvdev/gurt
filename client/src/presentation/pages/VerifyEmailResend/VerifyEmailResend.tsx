import { Button, Typography } from 'antd';
import { useLogout } from '~/application/features/auth/logout';
import { useSendEmailVerification } from '~/application/features/email/verify';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Icons } from '~/presentation/assets/Icons';
import { useVerifyEmailResendStyles } from '~/presentation/pages/VerifyEmailResend/VerifyEmailResend.styles';

export function VerifyEmailResend() {
  const { t } = useTranslation('common');
  const classes = useVerifyEmailResendStyles();

  const logout = useLogout({
    onError: () => {
      t('error.logout');
    },
  });

  const sendEmailVerification = useSendEmailVerification({
    onError: (message) => {
      notificationService.error(
        t(`serverMessage.${message}`, t('emailVerify.resend.error.fallback')),
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
    <EmptyLayout className={classes.layout}>
      <div className={classes.root}>
        <Icons.MailWarning className={classes.icon} />
        <Typography.Title level={2} className={classes.title}>
          {t('emailVerify.resend.label')}
        </Typography.Title>
        <Typography.Text type="secondary" className={classes.description}>
          {t('emailVerify.resend.description')}
        </Typography.Text>
        <Button
          type="primary"
          size="large"
          onClick={onResend}
          className={classes.resendBtn}
          loading={sendEmailVerification.isLoading}
        >
          {t('emailVerify.resend.resend')}
        </Button>
        <Button
          type="link"
          className={classes.logoutBtn}
          onClick={onLogout}
          loading={logout.isLoading}
        >
          {t('emailVerify.logout')}
        </Button>
      </div>
    </EmptyLayout>
  );
}
