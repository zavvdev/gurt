import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { PUBLIC_ROUTES } from '~/routes';

export function AuthWrapper({ children }: PropsWithChildren) {
  const isAuthenticated = false;

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to={PUBLIC_ROUTES.auth.login()} />
      ) : (
        children
      )}
    </>
  );
}
