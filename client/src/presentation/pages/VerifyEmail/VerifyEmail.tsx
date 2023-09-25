import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLogout } from '~/application/features/auth/logout';
import { useVerifyEmail } from '~/application/features/email/verify';
import { notificationService } from '~/application/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Spinner } from '~/presentation/shared/Spinner/Spinner';

export function VerifyEmail() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('common');
  const [isErrorHappened, setIsErrorHappened] = useState(false);

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
    <EmptyLayout className="flex justify-center">
      <div className="flex gap-4 items-center justify-center pt-24 max-md:pt-10 max-md:pb-20 flex-col max-md:w-full">
        <div className="flex flex-col items-center text-center">
          {verifyEmail.isLoading && !isErrorHappened && (
            <Spinner size="large" className="mb-4" />
          )}
          <Typography.Title
            level={2}
            className="text-4xl font-bold max-sm:text-3xl max-sm:w-full text-center "
          >
            {t('emailVerify.label')}
          </Typography.Title>
          {isErrorHappened && (
            <Typography.Text type="danger" className="w-72">
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
              className="max-sm:w-full"
              loading={verifyEmail.isLoading}
            >
              {t('emailVerify.tryAgain')}
            </Button>
            <Button
              type="link"
              className="flex items-center gap-2"
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
