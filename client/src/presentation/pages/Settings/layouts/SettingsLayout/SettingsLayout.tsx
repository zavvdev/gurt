import { Menu } from 'antd';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'clsx';
import { PRIVATE_ROUTES } from '~/routes';
import { Icons } from '~/presentation/assets/Icons';
import { LabeledLayout } from '~/presentation/layouts/Labeled/LabeledLayout';
import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useSettingsLayoutStyles } from '~/presentation/pages/Settings/layouts/SettingsLayout/SettingsLayout.styles';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Props extends PropsWithChildren {
  label: string;
  onBack?: () => void;
  noMenu?: boolean;
  contentClassName?: string;
}

export function SettingsLayout({
  children,
  label,
  onBack,
  noMenu = false,
  contentClassName,
}: Props) {
  const { t } = useTranslation('settings');
  const classes = useSettingsLayoutStyles();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: PRIVATE_ROUTES.settings.profile(),
      icon: <Icons.UserCircle2 />,
      label: t('menu.profile'),
      className: classes.menuItem,
      onClick: () => {
        navigate(PRIVATE_ROUTES.settings.profile());
      },
    },
    {
      key: PRIVATE_ROUTES.settings.account(),
      icon: <Icons.UserCog2 />,
      label: t('menu.account'),
      className: classes.menuItem,
      onClick: () => {
        navigate(PRIVATE_ROUTES.settings.account());
      },
    },
    {
      key: PRIVATE_ROUTES.settings.app(),
      icon: <Icons.LayoutGrid />,
      label: t('menu.app'),
      className: classes.menuItem,
      onClick: () => {
        navigate(PRIVATE_ROUTES.settings.app());
      },
    },
  ];

  return (
    <UserLayout noPaddingTop>
      <LabeledLayout label={label} onBack={onBack} noBackBtn={!onBack}>
        <div className={classes.root}>
          {!noMenu && (
            <Menu
              mode="inline"
              items={menuItems}
              className={classes.menu}
              selectedKeys={[window.location.pathname]}
            />
          )}
          {children && (
            <div className={cn(classes.content, contentClassName)}>
              {children}
            </div>
          )}
        </div>
      </LabeledLayout>
    </UserLayout>
  );
}
