import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIVATE_ROUTES, PUBLIC_ROUTES, useCreateRoute } from '~/routes';
import { ThemeSwitch } from '~/presentation/containers/ThemeSwitch/ThemeSwitch';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { LanguageSwitch } from '~/presentation/containers/LanguageSwitch/LanguageSwitch';
import { Icons } from '~/presentation/shared/Icons';
import { cn } from '~/presentation/utilities/styles';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const pathname = usePathname();
  const { r } = useCreateRoute();
  const { t } = useTranslation('common');

  const menu = [
    {
      label: t('guestLayout.menu.login'),
      route: r(PUBLIC_ROUTES.auth.login()),
      isActive: pathname.includes(PUBLIC_ROUTES.auth.login()),
    },
    {
      label: t('guestLayout.menu.register'),
      route: r(PUBLIC_ROUTES.auth.register()),
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
        <Link href={r(PRIVATE_ROUTES.home())}>
          <Icons.Logo className="text-primary dark:text-text_DT w-[4.5rem]" />
        </Link>
        <nav className="flex gap-10 items-center flex-wrap max-md:gap-5">
          {menu.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className={cn('hoverable', {
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
