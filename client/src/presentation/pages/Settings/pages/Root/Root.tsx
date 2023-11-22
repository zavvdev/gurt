import { matchPath, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PRIVATE_ROUTES } from '~/routes';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useMediaQuery } from '~/presentation/utilities/hooks/useMeriaQuery';
import { mediaBreakpoints } from '~/presentation/styles/theme';
import { SettingsLayout } from '~/presentation/pages/Settings/layouts/SettingsLayout/SettingsLayout';

export function Root() {
  const { t } = useTranslation('settings');
  const navigate = useNavigate();
  const isMaxMd = useMediaQuery(mediaBreakpoints.maxMd);

  useEffect(() => {
    if (
      !isMaxMd &&
      matchPath(PRIVATE_ROUTES.settings.root(), window.location.pathname)
    ) {
      navigate(PRIVATE_ROUTES.settings.profile());
    }
  }, [isMaxMd, navigate]);

  return <SettingsLayout label={t('label')} />;
}
