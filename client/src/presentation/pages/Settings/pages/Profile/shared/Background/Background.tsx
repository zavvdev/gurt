import { Skeleton } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useBackgroundStyles } from '~/presentation/pages/Settings/pages/Profile/shared/Background/Background.styles';
import { FileUploader } from '~/presentation/widgets/FileUploader/FileUploader';

interface Props {
  fileUrl: string | null;
  onSelect: (fileUrl: string | null) => void;
  isLoading: boolean;
}

export function Background({ fileUrl, onSelect, isLoading }: Props) {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useBackgroundStyles();
  const [key, setKey] = useState(2);

  const onRemove = () => {
    onSelect(null);
    setKey((prev) => prev + +new Date());
  };

  return isLoading ? (
    <Skeleton.Avatar
      active
      size="large"
      shape="square"
      className={classes.skeleton}
    />
  ) : (
    <ImgCrop
      key={key}
      rotationSlider
      showGrid
      showReset
      aspect={5}
      modalTitle={t('profile.background.edit')}
      modalOk={tCommon('label.save')}
      modalCancel={tCommon('label.cancel')}
      resetText={tCommon('label.reset')}
    >
      <FileUploader
        fileUrl={fileUrl}
        onChange={onSelect}
        onRemove={onRemove}
        className={classes.upload}
      />
    </ImgCrop>
  );
}
