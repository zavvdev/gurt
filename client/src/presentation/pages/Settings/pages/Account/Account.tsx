import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { useAccountStyles } from '~/presentation/pages/Settings/pages/Account/Account.styles';
import { Logout } from '~/presentation/pages/Settings/pages/Account/shared/Logout/Logout';
import { Delete } from '~/presentation/pages/Settings/pages/Account/shared/Delete/Delete';
import { ChangePassword } from '~/presentation/pages/Settings/pages/Account/shared/ChangePassword/ChangePassword';

export function Account() {
  const { t } = useTranslation('settings');
  const classes = useAccountStyles();

  return (
    <SettingsPageLayout label={t('account.label')} className={classes.content}>
      <ChangePassword />
      <div className={classes.footer}>
        <Logout />
        <Delete />
      </div>
    </SettingsPageLayout>
  );
}
