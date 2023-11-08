import { Skeleton, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useImageStyles } from '~/presentation/pages/Settings/pages/Profile/shared/Image/Image.styles';

interface Props {
  fileUrl: string | null;
  onSelect: (file: UploadFile | null) => void;
  isLoading: boolean;
}

export function Image({ fileUrl, onSelect, isLoading }: Props) {
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
      <Upload
        listType="picture-card"
        fileList={
          fileUrl
            ? [
                {
                  uid: '-1',
                  name: fileUrl,
                  status: 'done',
                  url: fileUrl,
                },
              ]
            : []
        }
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
        {!fileUrl && <Icons.ImagePlus />}
      </Upload>
    </ImgCrop>
  );
}
