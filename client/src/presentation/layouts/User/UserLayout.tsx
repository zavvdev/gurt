import { matchPath, useNavigate } from 'react-router-dom';
import cn from 'clsx';
import { PRIVATE_ROUTES } from '~/routes';
import { Icons } from '~/presentation/assets/Icons';
import { useUserLayoutStyles } from '~/presentation/layouts/User/UserLayout.styles';

export function UserLayout({ children }: { children: React.ReactNode }) {
  const classes = useUserLayoutStyles();
  const navigate = useNavigate();

  const isRouteActive = (path: string) => {
    return Boolean(matchPath(path, window.location.pathname));
  };

  const navigation = [
    {
      id: 1,
      icon: <Icons.Home />,
      isActive: isRouteActive(PRIVATE_ROUTES.home()),
      onClick: () => navigate(PRIVATE_ROUTES.home()),
    },
    {
      id: 2,
      icon: <Icons.Users />,
      isActive: false,
      onClick: () => {},
    },
    {
      id: 3,
      icon: <Icons.Hash />,
      isActive: false,
      onClick: () => {},
    },
    {
      id: 4,
      icon: <Icons.UserCircle />,
      isActive: false,
      onClick: () => {},
    },
    {
      id: 5,
      icon: <Icons.Search />,
      isActive: false,
      onClick: () => {},
    },
    {
      id: 6,
      icon: <Icons.Settings />,
      isActive: false,
      onClick: () => {},
    },
  ];

  return (
    <div className={classes.root}>
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
