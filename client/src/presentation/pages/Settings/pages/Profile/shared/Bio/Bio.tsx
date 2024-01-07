import { Skeleton, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';

interface Props {
  value?: string | null;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  error?: string;
  isLoading: boolean;
}

export function Bio({ value, onChange, onBlur, error, isLoading }: Props) {
  const { t } = useTranslation('common');

  return (
    <SettingItem label={t('label.bio')}>
      {isLoading ? (
        <Skeleton.Input
          active
          size="large"
          block
          style={{ height: '9.4rem' }}
        />
      ) : (
        <>
          <TextArea
            size="large"
            name="bio"
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            autoSize={{ minRows: 3, maxRows: 5 }}
            status={error ? 'error' : undefined}
          />
          {Boolean(error) && (
            <Typography.Text type="danger">{error}</Typography.Text>
          )}
        </>
      )}
    </SettingItem>
  );
}
