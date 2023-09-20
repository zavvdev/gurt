import { useEffect, useState } from 'react';
import { useLogout } from '~/core/features/auth/logout';
import { useVerifyEmail } from '~/core/features/email/verify';
import { notificationService } from '~/core/services/NotificationService';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { EmptyLayout } from '~/presentation/layouts/Empty/EmptyLayout';
import { Button } from '~/presentation/shared/Button/Button';
import { Loader } from '~/presentation/shared/Loader/Loader';

export function VerifyEmail() {
  const { t: tServerMessage } = useTranslation('serverMessage');
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
        tServerMessage(`${message}`, t('emailVerify.error.fallback')),
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
          {verifyEmail.isLoading && !isErrorHappened && <Loader size="large" />}
          <h2 className="text-4xl font-bold max-sm:text-3xl w-96 max-sm:w-full text-center ">
            {t('emailVerify.label')}
          </h2>
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
              leftAdornment={verifyEmail.isLoading && <Loader color="white" />}
            >
              {t('emailVerify.tryAgain')}
            </Button>
            <button
              className="link mt-5 flex items-center gap-2"
              onClick={onLogout}
            >
              {logout.isLoading && <Loader size="small" color="link" />}{' '}
              {t('emailVerify.logout')}
            </button>
          </>
        )}
      </div>
    </EmptyLayout>
  );
}
