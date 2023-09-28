import cx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { LanguageSwitch } from '~/presentation/shared/LanguageSwitch/LanguageSwitch';
import { Icons } from '~/presentation/assets/Icons';
import { ThemeSwitch } from '~/presentation/shared/ThemeSwitch/ThemeSwitch';
import { useGuestLayoutStyles } from '~/presentation/layouts/Guest/GuestLayout.styles';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const { t } = useTranslation('common');
  const classes = useGuestLayoutStyles();
  const navigate = useNavigate();

  const menu = [
    {
      label: t('guestLayout.menu.login'),
      route: PUBLIC_ROUTES.auth.login(),
      isActive: window.location.pathname.includes(PUBLIC_ROUTES.auth.login()),
    },
    {
      label: t('guestLayout.menu.register'),
      route: PUBLIC_ROUTES.auth.register(),
      isActive: window.location.pathname.includes(
        PUBLIC_ROUTES.auth.register(),
      ),
    },
  ];

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        <Link to={PRIVATE_ROUTES.home()}>
          <Icons.Logo className={classes.logo} />
        </Link>
        <nav className={classes.nav}>
          {menu.map((link) => (
            <Button
              type="link"
              key={link.label}
              onClick={() => navigate(link.route)}
              className={cx(classes.navItem, {
                [classes.navItemActive]: link.isActive,
              })}
            >
              {link.label}
            </Button>
          ))}
          <div className={classes.actions}>
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </nav>
      </header>
      <div className={classes.content}>{children}</div>
    </section>
  );
}
