import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import { Svg } from '~/presentation/assets/Svg';
import { ThemeSwitch } from '~/presentation/widgets/ThemeSwitch/ThemeSwitch';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { LanguageSwitch } from '~/presentation/widgets/LanguageSwitch/LanguageSwitch';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  const menu = [
    {
      label: t('guestLayout.menu.login'),
      route: PUBLIC_ROUTES.auth.login(),
      isActive: pathname.includes(PUBLIC_ROUTES.auth.login()),
    },
    {
      label: t('guestLayout.menu.register'),
      route: PUBLIC_ROUTES.auth.register(),
      isActive: pathname.includes(PUBLIC_ROUTES.auth.register()),
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
          <Svg.Logo className="text-prm dark:text-txt_DT w-[4.5rem]" />
        </Link>
        <nav className="flex gap-8 items-center flex-wrap max-md:gap-2 max-md:text-sm">
          {menu.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className={twMerge(
                `py-1 px-2 rounded bg-transparent hover:bg-prmFade
              ease-in-out duration-200 dark:hover:bg-prmFade_DT`,
                link.isActive && 'text-prm',
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeSwitch />
        </nav>
      </header>
      <div className="flex-1 overflow-y-scroll px-[5%] max-md:overflow-visible">
        {children}
      </div>
      <footer className="px-[5%] py-8 max-md:py-5 flex justify-between items-center">
        <div className="text-gray-400 text-sm max-md:text-xs">
          © Gurt {new Date().getFullYear()}
        </div>
        <LanguageSwitch />
      </footer>
    </section>
  );
}
