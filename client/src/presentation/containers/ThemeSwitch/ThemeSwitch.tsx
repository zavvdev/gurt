import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useTheme } from 'next-themes';
import { Icons } from '~/presentation/shared/Icons';
import { Theme } from '~/presentation/styles/theme';
import { useTranslation } from '~/presentation/i18n/useTranslation';

const defaultTheme = 'system';

export function ThemeSwitch() {
  const { t } = useTranslation('common');
  const { setTheme, theme } = useTheme();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setTheme(key);
  };

  const items: MenuProps['items'] = [
    {
      key: Theme.Light,
      label: (
        <div className="flex items-center">
          <Icons.SunMedium className="mr-2 h-5 w-5" />
          <span>{t('theme.light')}</span>
        </div>
      ),
    },
    {
      key: Theme.Dark,
      label: (
        <div className="flex items-center">
          <Icons.Moon className="mr-2 h-5 w-5" />
          <span>{t('theme.dark')}</span>
        </div>
      ),
    },
    {
      key: 'system',
      label: (
        <div className="flex items-center">
          <Icons.Laptop2 className="stroke-1.5 mr-2 h-5 w-5" />
          <span>{t('theme.system')}</span>
        </div>
      ),
    },
  ];

  const iconByTheme: Record<string, React.ReactElement> = {
    system: <Icons.Laptop2 />,
    [Theme.Dark]: <Icons.Moon />,
    [Theme.Light]: <Icons.SunMedium />,
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [theme ?? defaultTheme],
        onClick,
      }}
    >
      <Button type="text" className="p-2 flex items-center justify-center">
        {iconByTheme[theme || defaultTheme] || iconByTheme[defaultTheme]}
      </Button>
    </Dropdown>
  );
}
