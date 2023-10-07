import { observer } from 'mobx-react';
import { Button, Dropdown, Select } from 'antd';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/types';
import { useThemeSwitchStyles } from '~/presentation/shared/ThemeSwitch/ThemeSwitch.styles';

interface Props {
  variant?: 'dropdown' | 'select';
}

export const ThemeSwitch = observer(({ variant }: Props) => {
  const { t } = useTranslation('common');
  const classes = useThemeSwitchStyles();

  const onChangeTheme = (nextTheme: ThemeType) => {
    setTimeout(() => {
      themeStore.setTheme(nextTheme);
    }, 300);
  };

  const items = [
    {
      key: ThemeType.Light,
      label: (
        <div className={classes.icon}>
          <Icons.SunMedium />
          <span>{t('theme.light')}</span>
        </div>
      ),
      text: t('theme.light'),
    },
    {
      key: ThemeType.Dark,
      label: (
        <div className={classes.icon}>
          <Icons.Moon />
          <span>{t('theme.dark')}</span>
        </div>
      ),
      text: t('theme.dark'),
    },
    {
      key: ThemeType.System,
      label: (
        <div className={classes.icon}>
          <Icons.Laptop2 />
          <span>{t('theme.system')}</span>
        </div>
      ),
      text: t('theme.system'),
    },
  ];

  const iconByTheme: Record<string, React.ReactElement> = {
    [ThemeType.System]: <Icons.Laptop2 />,
    [ThemeType.Dark]: <Icons.Moon />,
    [ThemeType.Light]: <Icons.SunMedium />,
  };

  return variant === 'select' ? (
    <Select
      value={themeStore.theme}
      onChange={(value) => onChangeTheme(value)}
      options={items.map((i) => ({ value: i.key, label: i.text }))}
    />
  ) : (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [themeStore.theme],
        onClick: ({ key }) => onChangeTheme(key as ThemeType),
      }}
    >
      <Button type="text" className={classes.button}>
        {iconByTheme[themeStore.theme]}
      </Button>
    </Dropdown>
  );
});
