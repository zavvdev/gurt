import { RouteObject } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/routes';
import { Login } from '~/presentation/pages/Auth/Login/Login';
import { Register } from '~/presentation/pages/Auth/Register/Register';
import { ForgotPassword } from '~/presentation/pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from '~/presentation/pages/Auth/ResetPassword/ResetPassword';
import { PublicAuthRouteGuard } from '~/presentation/router/shared/PublicAuthRouteGuard';

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTES.auth.login(),
    element: (
      <PublicAuthRouteGuard>
        <Login />
      </PublicAuthRouteGuard>
    ),
  },
  {
    path: PUBLIC_ROUTES.auth.register(),
    element: (
      <PublicAuthRouteGuard>
        <Register />
      </PublicAuthRouteGuard>
    ),
  },
  {
    path: PUBLIC_ROUTES.auth.forgotPassword(),
    element: (
      <PublicAuthRouteGuard>
        <ForgotPassword />
      </PublicAuthRouteGuard>
    ),
  },
  {
    path: PUBLIC_ROUTES.auth.resetPassword(),
    element: (
      <PublicAuthRouteGuard>
        <ResetPassword />
      </PublicAuthRouteGuard>
    ),
  },
];
