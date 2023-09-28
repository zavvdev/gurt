import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { PUBLIC_ROUTES } from '~/routes';
import { isAuthenticated } from '~/application/features/auth/utilities';

export function AuthWrapper({ children }: PropsWithChildren) {
  if (!isAuthenticated()) {
    return <Navigate to={PUBLIC_ROUTES.auth.login()} />;
  }
  return children;
}
