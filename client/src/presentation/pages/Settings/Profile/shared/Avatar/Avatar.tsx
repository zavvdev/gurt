import { Modal, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useAvatarStyles } from '~/presentation/pages/Settings/Profile/shared/Avatar/Avatar.styles';
import { getAntImageBase64 } from '~/presentation/utilities/general';

interface Props {
  file: UploadFile | null;
  onSelect: (file: UploadFile | null) => void;
}

export function Avatar({ file, onSelect }: Props) {
  const { t } = useTranslation('settings');
  const classes = useAvatarStyles();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getAntImageBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    onSelect(fileList?.[0] || null);
  };

  return (
    <>
      <ImgCrop
        rotationSlider
        showGrid
        showReset
        modalTitle={t('profile.picture.edit')}
        modalOk={t('profile.picture.save')}
        modalCancel={t('profile.picture.cancel')}
        resetText={t('profile.picture.reset')}
      >
        <Upload
          listType="picture-card"
          fileList={file ? [file] : []}
          className={classes.upload}
          onChange={onChange}
          onPreview={onPreview}
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
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        title={t('profile.picture.label')}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
