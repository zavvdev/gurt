import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { usePublicAuthRoutePSIDGuard } from '~/application/features/auth/session';

export function PublicAuthRouteGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = usePublicAuthRoutePSIDGuard();

  return (
    <>{isAuthenticated ? <Navigate to={PRIVATE_ROUTES.home()} /> : children}</>
  );
}
