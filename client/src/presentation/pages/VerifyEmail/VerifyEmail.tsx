import { Button, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLogout } from '~/core/features/auth/logout';
import { useVerifyEmail } from '~/core/features/email/verify';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';

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
      <div className="flex items-center justify-center pt-24 max-md:pt-10 max-md:pb-20 flex-col w-96 max-md:w-full">
        <div className="flex gap-4 flex-col items-center mb-10">
          {verifyEmail.isLoading && !isErrorHappened && <Spin size="large" />}
          <Typography.Title
            level={2}
            className="text-4xl font-bold max-sm:text-3xl w-96 max-sm:w-full text-center "
          >
            {t('emailVerify.label')}
          </Typography.Title>
        </div>
        {isErrorHappened && (
          <>
            <Button
              size="large"
              onClick={() => {
                if (!verifyEmail.isLoading) {
                  verifyEmail.initiate();
                }
              }}
              className="max-sm:w-full"
              icon={verifyEmail.isLoading && <Spin />}
            >
              {t('emailVerify.tryAgain')}
            </Button>
            <Button
              type="text"
              className="mt-5 flex items-center gap-2"
              onClick={onLogout}
            >
              {logout.isLoading && <Spin size="small" />}{' '}
              {t('emailVerify.logout')}
            </Button>
          </>
        )}
      </div>
    </EmptyLayout>
  );
}
