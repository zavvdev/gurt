import { Input, Skeleton, Typography } from 'antd';
import { ChangeEvent } from 'react';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';

interface Props {
  value?: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  error?: string;
  isLoading: boolean;
}

export function Username({ value, onChange, onBlur, error, isLoading }: Props) {
  const { t } = useTranslation('common');
  const { theme } = useJssTheme();

  return (
    <SettingItem label={t('label.username')}>
      {isLoading ? (
        <Skeleton.Input active size="large" block />
      ) : (
        <>
          <Input
            size="large"
            name="username"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            status={error ? 'error' : undefined}
            prefix={<Icons.AtSign width={17} color={theme.color.gray6} />}
          />
          {Boolean(error) && (
            <Typography.Text type="danger">{error}</Typography.Text>
          )}
        </>
      )}
    </SettingItem>
  );
}
