import { UploadFile } from 'antd';
import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { Image } from '~/presentation/pages/Settings/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Settings/Profile/shared/Background/Background';
import { useProfileStyles } from '~/presentation/pages/Settings/Profile/Profile.styles';

export function Profile() {
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();

  const [file, setFile] = useState<UploadFile | null>(null);
  const [bg, setBg] = useState<UploadFile | null>(null);

  // const a = {
  //   uid: '-1',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // };

  return (
    <SettingsPageLayout label={t('profile.label')}>
      <div className={classes.images}>
        <Image file={file} onSelect={setFile} />
        <Background file={bg} onSelect={setBg} />
      </div>
      123
    </SettingsPageLayout>
  );
}
