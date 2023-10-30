import { UploadFile } from 'antd';
import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { Avatar } from '~/presentation/pages/Settings/Profile/shared/Avatar/Avatar';

export function Profile() {
  const { t } = useTranslation('settings');
  const [file, setFile] = useState<UploadFile | null>(null);

  // const a = {
  //   uid: '-1',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // };

  return (
    <SettingsPageLayout label={t('profile.label')}>
      <Avatar file={file} onSelect={setFile} />
    </SettingsPageLayout>
  );
}
