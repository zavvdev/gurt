import { Button, Dropdown, Select } from 'antd';
import { FALLBACK_LNG, LANGUAGES } from '~/presentation/i18n/config';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { Icons } from '~/presentation/assets/Icons';
import { useLanguageSwitchStyles } from '~/presentation/shared/LanguageSwitch/LanguageSwitch.styles';

interface Props {
  variant?: 'dropdown' | 'select';
}

export function LanguageSwitch({ variant }: Props) {
  const { i18n } = useTranslation('common');
  const classes = useLanguageSwitchStyles();

  const items = [
    {
      key: LANGUAGES.en,
      label: LANGUAGES.en,
    },
    {
      key: LANGUAGES.uk,
      label: LANGUAGES.uk,
    },
    {
      key: LANGUAGES.pl,
      label: LANGUAGES.pl,
    },
  ];

  return variant === 'select' ? (
    <Select
      value={i18n.language ?? FALLBACK_LNG}
      onChange={(value) => i18n.changeLanguage(value)}
      options={items.map((i) => ({ value: i.key, label: i.label }))}
      className={classes.select}
    />
  ) : (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [i18n.language ?? FALLBACK_LNG],
        onClick: ({ key }) => i18n.changeLanguage(key),
      }}
    >
      <Button type="text" className={classes.button}>
        <Icons.Languages />
      </Button>
    </Dropdown>
  );
}
