import Link from 'next/link';
import { Svg } from '~/presentation/assets/Svg';
import { ThemeSwitch } from '~/presentation/components/widgets/ThemeSwitch/ThemeSwitch.view';
import { useGuestMenu } from '~/core/hooks/useGuestMenu';

interface Props {
  children: React.ReactNode;
}

export function GuestLayout({ children }: Props) {
  const guestMenu = useGuestMenu();

  const labelByKey: Record<string, string> = {
    login: 'Вхід',
    register: 'Реєстрація',
  };

  return (
    <section className="h-screen flex flex-col justify-between">
      <header
        className="
          px-[5%] py-8 flex justify-between items-center
          max-md:flex-col max-md:gap-6
        "
      >
        <Svg.Logo className="text-primary dark:text-textDark w-[4.5rem]" />
        <nav className="flex gap-8 items-center flex-wrap max-md:gap-2 max-md:text-sm">
          {guestMenu.map((link) => (
            <Link
              key={link.key}
              href={link.route}
              className={`py-1 px-2 rounded bg-transparent hover:bg-primaryLight
              ease-in-out duration-200 dark:hover:bg-primaryLightDark ${
                link.isActive && 'text-primary'
              }`}
            >
              {labelByKey[link.key]}
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
      </footer>
    </section>
  );
}
