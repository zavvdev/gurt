import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { PUBLIC_ROUTES } from '~/routes';
import { isAuthenticated } from '~/application/features/auth/utilities';

export function AuthWrapper({ children }: PropsWithChildren) {
  return (
    <>
      {!isAuthenticated() ? (
        <Navigate to={PUBLIC_ROUTES.auth.login()} />
      ) : (
        children
      )}
    </>
  );
}
