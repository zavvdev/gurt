import { useParams } from 'next/navigation';

export const PUBLIC_ROUTES = {
  auth: {
    login: () => '/login',
    register: () => '/register',
    forgotPassword: () => '/forgot-password',
    resetPassword: () => '/reset-password',
  },
};

export const PRIVATE_ROUTES = {
  home: () => '/home',
  verifyEmail: () => '/verify-email',
};

/* ============================= */

function collectRoutes(
  routes: typeof PRIVATE_ROUTES | typeof PUBLIC_ROUTES,
  nextRoutes: string[] = [],
) {
  const result = [...nextRoutes];
  for (const route of Object.values(routes)) {
    if (typeof route === 'function') {
      result.push(route());
    } else {
      return collectRoutes(route, result);
    }
  }
  return result;
}

export const PUBLIC_ROUTES_LIST = collectRoutes(PUBLIC_ROUTES);

export const PRIVATE_ROUTES_LIST = collectRoutes(PRIVATE_ROUTES);

/* ============================= */

export function useCreateRoute() {
  const params = useParams();

  const r = (route: string) => {
    const preparedRoute = route[0] === '/' ? route : `/${route}`;
    return `/${params.lng}${preparedRoute}`;
  };

  return {
    r,
  };
}
