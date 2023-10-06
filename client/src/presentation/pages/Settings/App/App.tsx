import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { LanguageSwitch } from '~/presentation/shared/LanguageSwitch/LanguageSwitch';
import { ThemeSwitch } from '~/presentation/shared/ThemeSwitch/ThemeSwitch';

export function App() {
  const { t } = useTranslation('settings');

  return (
    <SettingsPageLayout label={t('app.label')}>
      <SettingItem label={t('app.language')}>
        <LanguageSwitch variant="select" />
      </SettingItem>
      <SettingItem label={t('app.theme')}>
        <ThemeSwitch variant="select" />
      </SettingItem>
    </SettingsPageLayout>
  );
}
