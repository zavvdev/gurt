import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { useAccountStyles } from '~/presentation/pages/Settings/pages/Account/Account.styles';

export function Account() {
  const { t } = useTranslation('settings');
  const classes = useAccountStyles();

  return (
    <SettingsPageLayout label={t('account.label')} className={classes.content}>
      Account settings
    </SettingsPageLayout>
  );
}
