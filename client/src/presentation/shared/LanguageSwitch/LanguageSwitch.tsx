import { Button, Dropdown, MenuProps } from 'antd';
import { FALLBACK_LNG, LANGUAGES } from '~/presentation/i18n/config';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { Icons } from '~/presentation/assets/Icons';

export function LanguageSwitch() {
  const { i18n } = useTranslation('common');

  const onClick: MenuProps['onClick'] = ({ key: lang }) => {
    i18n.changeLanguage(lang);
  };

  const items: MenuProps['items'] = [
    {
      key: LANGUAGES.en,
      label: LANGUAGES.en,
    },
    {
      key: LANGUAGES.uk,
      label: LANGUAGES.uk,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [i18n.language ?? FALLBACK_LNG],
        onClick,
      }}
    >
      <Button type="text" className="p-2 flex items-center justify-center">
        <Icons.Languages />
      </Button>
    </Dropdown>
  );
}
