import { Button, Input, UploadFile } from 'antd';
import { useState } from 'react';
import cn from 'clsx';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { Image } from '~/presentation/pages/Settings/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Settings/Profile/shared/Background/Background';
import { useProfileStyles } from '~/presentation/pages/Settings/Profile/Profile.styles';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { Icons } from '~/presentation/assets/Icons';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';

export function Profile() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();
  const { theme } = useJssTheme();

  const [file, setFile] = useState<UploadFile | null>(null);
  const [bg, setBg] = useState<UploadFile | null>(null);

  return (
    <SettingsPageLayout label={t('profile.label')} className={classes.content}>
      <div className={cn(classes.row, classes.images)}>
        <Image file={file} onSelect={setFile} />
        <Background file={bg} onSelect={setBg} />
      </div>
      <div className={classes.row}>
        <SettingItem dir="col" label={tCommon('label.name')}>
          <Input size="large" name="name" />
        </SettingItem>
        <SettingItem dir="col" label={tCommon('label.username')}>
          <Input
            size="large"
            name="username"
            prefix={<Icons.AtSign width={17} color={theme.color.gray6} />}
          />
        </SettingItem>
      </div>
      <SettingItem dir="col" label={tCommon('label.bio')}>
        <TextArea size="large" autoSize={{ minRows: 3, maxRows: 5 }} />
      </SettingItem>
      <div className={classes.row}>
        <Button type="primary" size="large" icon={<Icons.Save width={17} />}>
          {tCommon('label.save')}
        </Button>
        <Button size="large">{tCommon('label.reset')}</Button>
      </div>
    </SettingsPageLayout>
  );
}
