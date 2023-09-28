import { RouteObject } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/routes';
import { Login } from '~/presentation/pages/Auth/Login/Login';
import { Register } from '~/presentation/pages/Auth/Register/Register';
import { ForgotPassword } from '~/presentation/pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from '~/presentation/pages/Auth/ResetPassword/ResetPassword';

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTES.auth.login(),
    element: <Login />,
  },
  {
    path: PUBLIC_ROUTES.auth.register(),
    element: <Register />,
  },
  {
    path: PUBLIC_ROUTES.auth.forgotPassword(),
    element: <ForgotPassword />,
  },
  {
    path: PUBLIC_ROUTES.auth.resetPassword(),
    element: <ResetPassword />,
  },
];
