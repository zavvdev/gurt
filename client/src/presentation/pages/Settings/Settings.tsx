import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PRIVATE_ROUTES } from '~/routes';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { LabeledLayout } from '~/presentation/layouts/Labeled/LabeledLayout';
import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useSettingsStyles } from '~/presentation/pages/Settings/Settings.styles';
import { Account } from '~/presentation/pages/Settings/Account/Account';
import { Interests } from '~/presentation/pages/Settings/Interests/Interests';
import { useMediaQuery } from '~/presentation/utilities/hooks/useMeriaQuery';
import { mediaBreakpoints } from '~/presentation/styles/theme';

export function Settings() {
  const { t } = useTranslation('settings');
  const classes = useSettingsStyles();
  const navigate = useNavigate();

  const isMaxMd = useMediaQuery(mediaBreakpoints.maxMd);

  const menuItems = [
    {
      key: PRIVATE_ROUTES.settings.account(),
      icon: <Icons.User />,
      label: 'Account',
      className: classes.menuItem,
      onClick: () => {
        navigate(PRIVATE_ROUTES.settings.account());
      },
    },
    {
      key: PRIVATE_ROUTES.settings.interests(),
      icon: <Icons.Hash />,
      label: 'Interests',
      className: classes.menuItem,
      onClick: () => {
        navigate(PRIVATE_ROUTES.settings.interests());
      },
    },
  ];

  const pagesMap = {
    [PRIVATE_ROUTES.settings.account()]: <Account />,
    [PRIVATE_ROUTES.settings.interests()]: <Interests />,
  };

  useEffect(() => {
    if (
      !isMaxMd &&
      window.location.pathname === PRIVATE_ROUTES.settings.root()
    ) {
      navigate(PRIVATE_ROUTES.settings.account());
    }
  }, [isMaxMd, navigate]);

  return (
    <UserLayout noPaddingTop>
      <LabeledLayout label={t('label')}>
        <div className={classes.root}>
          <Menu
            mode="inline"
            items={menuItems}
            className={classes.menu}
            selectedKeys={[window.location.pathname]}
          />
          <div className={classes.content}>
            {pagesMap[window.location.pathname]}
          </div>
        </div>
      </LabeledLayout>
    </UserLayout>
  );
}
