import { Skeleton, Typography } from 'antd';
import { ChangeEvent } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { DatePicker } from '~/presentation/shared/DatePicker/DatePicker';

interface Props {
  value?: string | null;
  onChange: (n: Date | null) => void;
  onBlur: (e: ChangeEvent) => void;
  error?: string;
  isLoading: boolean;
}

export function DateOfBirth({
  value,
  onChange,
  onBlur,
  error,
  isLoading,
}: Props) {
  const { t } = useTranslation('common');

  return (
    <SettingItem dir="col" label={t('label.dateOfBirth')}>
      {isLoading ? (
        <Skeleton.Input active size="large" block />
      ) : (
        <>
          <DatePicker
            allowClear
            size="large"
            value={value ? dayjs(value) : undefined}
            onChange={(d) => onChange(d ? d?.toDate() : null)}
            onBlur={onBlur}
            format="DD/MM/YYYY"
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
