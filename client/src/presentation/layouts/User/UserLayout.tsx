import { useNavigate } from 'react-router-dom';
import cn from 'clsx';
import { PropsWithChildren } from 'react';
import { PRIVATE_ROUTES } from '~/routes';
import { Icons } from '~/presentation/assets/Icons';
import { useUserLayoutStyles } from '~/presentation/layouts/User/UserLayout.styles';

interface Props extends PropsWithChildren {
  noPaddingTop?: boolean;
}

export function UserLayout({ children, noPaddingTop }: Props) {
  const classes = useUserLayoutStyles();
  const navigate = useNavigate();

  const isRouteActive = (path: string) => {
    return window.location.pathname.startsWith(path);
  };

  const navigation = [
    {
      id: 1,
      icon: <Icons.Home />,
      isActive: isRouteActive(PRIVATE_ROUTES.home()),
      onClick: () => navigate(PRIVATE_ROUTES.home()),
    },
    {
      id: 4,
      icon: <Icons.UserCircle />,
      isActive: isRouteActive(PRIVATE_ROUTES.profile()),
      onClick: () => navigate(PRIVATE_ROUTES.profile()),
    },
    {
      id: 6,
      icon: <Icons.Settings />,
      isActive: isRouteActive(PRIVATE_ROUTES.settings.root()),
      onClick: () => navigate(PRIVATE_ROUTES.settings.root()),
    },
  ];

  return (
    <div
      className={cn(classes.root, {
        [classes.rootNoPaddingTop]: noPaddingTop,
      })}
    >
      {children}
      <nav className={classes.nav}>
        {navigation.map((n) => (
          <button
            key={n.id}
            onClick={n.onClick}
            className={cn(classes.navButton, {
              [classes.navButtonActive]: n.isActive,
            })}
          >
            {n.icon}
          </button>
        ))}
      </nav>
    </div>
  );
}
