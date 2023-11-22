import { Skeleton } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useImageStyles } from '~/presentation/pages/Settings/pages/Profile/shared/Image/Image.styles';
import { FileUploader } from '~/presentation/widgets/FileUploader/FileUploader';

interface Props {
  fileUrl: string | null;
  onSelect: (fileUrl: string | null) => void;
  isLoading: boolean;
}

export function Image({ fileUrl, onSelect, isLoading }: Props) {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useImageStyles();
  const [key, setKey] = useState(1);

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
      modalTitle={t('profile.picture.edit')}
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
