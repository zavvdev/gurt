import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLogout } from '~/application/features/auth/logout/useLogout';
import { notificationService } from '~/application/services/NotificationService';
import { useVerifyEmail } from '~/application/features/email/verify/useVerifyEmail';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Spinner } from '~/presentation/shared/Spinner/Spinner';
import { useVerifyEmailStyles } from '~/presentation/pages/VerifyEmail/VerifyEmail.styles';

export function VerifyEmail() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('common');
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const classes = useVerifyEmailStyles();

  const logout = useLogout({
    onError: () => {
      t('error.logout');
    },
  });

  const verifyEmail = useVerifyEmail({
    onError: (message) => {
      notificationService.error(
        tCommon(`serverMessage.${message}`, t('emailVerify.error.fallback')),
      );
      setIsErrorHappened(true);
    },
    onSuccess: () => {
      notificationService.success(t('emailVerify.success.fallback'));
    },
  });

  const onLogout = () => {
    if (!logout.isLoading) {
      logout.initiate();
    }
  };

  useEffect(() => {
    verifyEmail.initiate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EmptyLayout className={classes.layout}>
      <div className={classes.root}>
        <div className={classes.content}>
          {verifyEmail.isLoading && !isErrorHappened && (
            <Spinner size="large" className={classes.spinner} />
          )}
          <Typography.Title level={2} className={classes.title}>
            {t('emailVerify.label')}
          </Typography.Title>
          {isErrorHappened && (
            <Typography.Text type="danger" className={classes.error}>
              {t('emailVerify.error.description')}
            </Typography.Text>
          )}
        </div>
        {isErrorHappened && (
          <>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (!verifyEmail.isLoading) {
                  verifyEmail.initiate();
                }
              }}
              className={classes.tryAgainBtn}
              loading={verifyEmail.isLoading}
            >
              {t('emailVerify.tryAgain')}
            </Button>
            <Button
              type="link"
              className={classes.logoutBtn}
              onClick={onLogout}
              loading={logout.isLoading}
            >
              {t('emailVerify.logout')}
            </Button>
          </>
        )}
      </div>
    </EmptyLayout>
  );
}
