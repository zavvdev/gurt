import { observer } from 'mobx-react';
import { Button, Dropdown, MenuProps } from 'antd';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/config';

export const ThemeSwitch = observer(() => {
  const { t } = useTranslation('common');

  const onClick: MenuProps['onClick'] = ({ key }) => {
    themeStore.setTheme(key as ThemeType);
  };

  const items: MenuProps['items'] = [
    {
      key: ThemeType.Light,
      label: (
        <div className="flex items-center">
          <Icons.SunMedium className="mr-2 h-5 w-5" />
          <span>{t('theme.light')}</span>
        </div>
      ),
    },
    {
      key: ThemeType.Dark,
      label: (
        <div className="flex items-center">
          <Icons.Moon className="mr-2 h-5 w-5" />
          <span>{t('theme.dark')}</span>
        </div>
      ),
    },
    {
      key: ThemeType.System,
      label: (
        <div className="flex items-center">
          <Icons.Laptop2 className="stroke-1.5 mr-2 h-5 w-5" />
          <span>{t('theme.system')}</span>
        </div>
      ),
    },
  ];

  const iconByTheme: Record<string, React.ReactElement> = {
    [ThemeType.System]: <Icons.Laptop2 />,
    [ThemeType.Dark]: <Icons.Moon />,
    [ThemeType.Light]: <Icons.SunMedium />,
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [themeStore.theme],
        onClick,
      }}
    >
      <Button type="text" className="p-2 flex items-center justify-center">
        {iconByTheme[themeStore.theme]}
      </Button>
    </Dropdown>
  );
});
