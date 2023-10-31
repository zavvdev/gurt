import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useImageStyles } from '~/presentation/pages/Settings/Profile/shared/Image/Image.styles';

interface Props {
  file: UploadFile | null;
  onSelect: (file: UploadFile | null) => void;
}

export function Image({ file, onSelect }: Props) {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useImageStyles();
  const [key, setKey] = useState(1);

  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    onSelect(fileList?.[0] || null);
  };

  const onRemove = () => {
    onSelect(null);
    setKey((prev) => prev + +new Date());
  };

  return (
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
      <Upload
        listType="picture-card"
        fileList={file ? [file] : []}
        className={classes.upload}
        onChange={onChange}
        onRemove={onRemove}
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
