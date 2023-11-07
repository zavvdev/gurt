import { Select, Skeleton } from 'antd';
import { COUNTRIES } from '~/presentation/i18n/countries';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';

interface Props {
  value?: string | null;
  onChange: (n: string) => void;
  onBlur: () => void;
  error?: string;
  isLoading: boolean;
}

export function Country({ value, onChange, onBlur, isLoading }: Props) {
  const { i18n, t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');

  return (
    <SettingItem dir="col" label={tCommon('label.country')}>
      {isLoading ? (
        <Skeleton.Input active size="large" block />
      ) : (
        <Select
          allowClear
          showSearch
          size="large"
          optionFilterProp="children"
          placeholder={t('profile.country.placeholder')}
          value={value}
          onChange={(nextCountry) => onChange(nextCountry)}
          onBlur={onBlur}
          options={COUNTRIES.map((c) => ({
            value: c.code,
            label: c.name?.[i18n.language] || '',
          }))}
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
          }
        />
      )}
    </SettingItem>
  );
}
