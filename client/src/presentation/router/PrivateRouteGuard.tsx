import { PropsWithChildren } from 'react';
import { usePublicSessionIdGuard } from '~/application/features/auth/session';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function PrivateRouteGuard({ children }: PropsWithChildren) {
  const { t } = useTranslation('common');
  const status = usePublicSessionIdGuard();

  return (
    <>{status === 'verifying' ? <>{t('verifyingSession')}</> : children}</>
  );
}
