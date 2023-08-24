import Link from 'next/link';
import { LogoSvg } from '~/presentation/assets/svg/Logo';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const menu = [
    {
      route: '/login',
      label: 'Вхід',
    },
    {
      route: '/register',
      label: 'Реєстрація',
    },
    {
      route: '/about',
      label: 'Про нас',
    },
    {
      route: '/help',
      label: 'Допомога',
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
        <LogoSvg className="text-primary dark:text-textDark w-20" />
        <nav className="flex gap-8 items-center flex-wrap max-md:gap-2 max-md:text-sm">
          {menu.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className="py-1 px-2 rounded bg-transparent hover:bg-primaryLight
              ease-in-out duration-200 dark:hover:bg-primaryLightDark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="flex-1 overflow-y-scroll px-[5%] max-md:overflow-visible">
        {children}
      </div>
      <footer className="px-[5%] py-8 max-md:py-5">
        <div className="text-gray-400 text-sm max-md:text-xs">
          © Gurt {new Date().getFullYear()}
        </div>
      </footer>
    </section>
  );
}
