import { Input, Skeleton, Typography } from 'antd';
import { ChangeEvent } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';

interface Props {
  value?: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  error?: string;
  isLoading: boolean;
}

export function Name({ value, onChange, onBlur, error, isLoading }: Props) {
  const { t } = useTranslation('common');

  return (
    <SettingItem dir="col" label={t('label.name')}>
      {isLoading ? (
        <Skeleton.Input active size="large" block />
      ) : (
        <>
          <Input
            size="large"
            name="name"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
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
