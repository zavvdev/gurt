import { Upload, UploadProps } from 'antd';
import { UploadListType } from 'antd/es/upload/interface';
import { useState } from 'react';
import { useUploadFile } from '~/application/features/uploadFile/useUploadFile';
import { notificationService } from '~/application/services/NotificationService';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { Spinner } from '~/presentation/shared/Spinner/Spinner';

interface Props {
  fileUrl?: string | null;
  onChange: (nextFileUrl: string | null) => void;
  onRemove: () => void;
  className?: string;
  showPreviewIcon?: boolean;
  type?: UploadListType;
}

export function FileUploader({
  fileUrl,
  onChange,
  onRemove,
  className,
  showPreviewIcon = false,
  type = 'picture-card',
}: Props) {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);

  const upload = useUploadFile({
    onError: () => {
      notificationService.error(t('error.uploadFile'));
    },
  });

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      setIsLoading(true);
      upload
        .initiate(file)
        .then((response) => onChange(response))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const renderIcon = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (!fileUrl) {
      return <Icons.ImagePlus />;
    }
  };

  return (
    <Upload
      listType={type}
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
      className={className}
      onChange={handleChange}
      onRemove={onRemove}
      showUploadList={{
        showPreviewIcon,
      }}
      customRequest={({ onSuccess }) =>
        setTimeout(() => {
          onSuccess?.('ok');
        }, 0)
      }
    >
      {renderIcon()}
    </Upload>
  );
}
