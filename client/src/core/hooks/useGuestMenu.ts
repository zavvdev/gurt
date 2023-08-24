import { usePathname } from 'next/navigation';
import { ROUTES } from '~/infrastructure/config/routes';

export function useGuestMenu() {
  const pathname = usePathname();

  return [
    {
      key: 'login',
      route: ROUTES.auth.login(),
      isActive: pathname === ROUTES.auth.login(),
    },
    {
      key: 'register',
      route: ROUTES.auth.register(),
      isActive: pathname === ROUTES.auth.register(),
    },
  ];
}
