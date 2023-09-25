import { Route } from '@tanstack/react-router';
import { PUBLIC_ROUTES } from '~/routes';
import { rootRoute } from '~/presentation/router/rootRoute';
import { Login } from '~/presentation/pages/Auth/Login/Login';
import { Register } from '~/presentation/pages/Auth/Register/Register';
import { ForgotPassword } from '~/presentation/pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from '~/presentation/pages/Auth/ResetPassword/ResetPassword';

const login = new Route({
  getParentRoute: () => rootRoute,
  path: PUBLIC_ROUTES.auth.login(),
  component: Login,
});

const register = new Route({
  getParentRoute: () => rootRoute,
  path: PUBLIC_ROUTES.auth.register(),
  component: Register,
});

const forgotPassword = new Route({
  getParentRoute: () => rootRoute,
  path: PUBLIC_ROUTES.auth.forgotPassword(),
  component: ForgotPassword,
});

const resetPassword = new Route({
  getParentRoute: () => rootRoute,
  path: PUBLIC_ROUTES.auth.resetPassword(),
  component: ResetPassword,
});

export const publicRoutes = [login, register, forgotPassword, resetPassword];
