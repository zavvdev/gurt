import cx from 'clsx';
import { Link } from '@tanstack/react-router';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { LanguageSwitch } from '~/presentation/shared/LanguageSwitch/LanguageSwitch';
import { Icons } from '~/presentation/assets/Icons';
import { ThemeSwitch } from '~/presentation/shared/ThemeSwitch/ThemeSwitch';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const { t } = useTranslation('common');

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
    <section className="h-screen flex flex-col justify-between">
      <header
        className="
          px-[5%] py-8 flex justify-between items-center
          max-md:flex-col max-md:gap-6
        "
      >
        <Link href={PRIVATE_ROUTES.home()}>
          <Icons.Logo className="text-primary dark:text-text_DT w-[4.5rem]" />
        </Link>
        <nav className="flex gap-10 items-center flex-wrap max-md:gap-5">
          {menu.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className={cx('hoverable', {
                'text-primary': link.isActive,
              })}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </nav>
      </header>
      <div className="flex-1 overflow-y-scroll px-[5%] max-md:overflow-visible">
        {children}
      </div>
    </section>
  );
}
