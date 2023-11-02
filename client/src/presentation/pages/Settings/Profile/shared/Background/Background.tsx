import { Skeleton, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useBackgroundStyles } from '~/presentation/pages/Settings/Profile/shared/Background/Background.styles';

interface Props {
  file: UploadFile | null;
  onSelect: (file: UploadFile | null) => void;
  isLoading: boolean;
}

export function Background({ file, onSelect, isLoading }: Props) {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useBackgroundStyles();
  const [key, setKey] = useState(2);

  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    onSelect(fileList?.[0] || null);
  };

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
      <Upload
        listType="picture-card"
        fileList={file ? [file] : []}
        className={classes.upload}
        onChange={onChange}
        onRemove={onRemove}
        showUploadList={{
          showPreviewIcon: false,
        }}
        customRequest={({ onSuccess }) =>
          setTimeout(() => {
            onSuccess?.('ok');
          }, 0)
        }
        beforeUpload={(file) => {
          onSelect(file);
          return file;
        }}
      >
        {!file && <Icons.ImagePlus />}
      </Upload>
    </ImgCrop>
  );
}
