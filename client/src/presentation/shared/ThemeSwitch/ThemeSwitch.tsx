import { observer } from 'mobx-react';
import { Button, Dropdown, MenuProps } from 'antd';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/types';
import { useThemeSwitchStyles } from '~/presentation/shared/ThemeSwitch/ThemeSwitch.styles';

export const ThemeSwitch = observer(() => {
  const { t } = useTranslation('common');
  const classes = useThemeSwitchStyles();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setTimeout(() => {
      themeStore.setTheme(key as ThemeType);
    }, 300);
  };

  const items: MenuProps['items'] = [
    {
      key: ThemeType.Light,
      label: (
        <div className={classes.icon}>
          <Icons.SunMedium />
          <span>{t('theme.light')}</span>
        </div>
      ),
    },
    {
      key: ThemeType.Dark,
      label: (
        <div className={classes.icon}>
          <Icons.Moon />
          <span>{t('theme.dark')}</span>
        </div>
      ),
    },
    {
      key: ThemeType.System,
      label: (
        <div className={classes.icon}>
          <Icons.Laptop2 />
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
      <Button type="text" className={classes.button}>
        {iconByTheme[themeStore.theme]}
      </Button>
    </Dropdown>
  );
});
