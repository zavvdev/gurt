import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { useMediaQuery } from '~/presentation/utilities/hooks/useMeriaQuery';
import { mediaBreakpoints } from '~/presentation/styles/theme';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsLayout } from '~/presentation/pages/Settings/layouts/SettingsLayout/SettingsLayout';

interface Props extends PropsWithChildren {
  label: string;
  className?: string;
}

export function SettingsPageLayout({ children, label, className }: Props) {
  const { t } = useTranslation('settings');
  const isMaxMd = useMediaQuery(mediaBreakpoints.maxMd);
  const navigate = useNavigate();

  const handleBack = () => {
    if (isMaxMd) {
      navigate(PRIVATE_ROUTES.settings.root());
    } else {
      navigate(-1);
    }
  };

  return (
    <SettingsLayout
      label={isMaxMd ? label : t('label')}
      onBack={isMaxMd ? handleBack : undefined}
      noMenu={isMaxMd}
      contentClassName={className}
    >
      {children}
    </SettingsLayout>
  );
}
