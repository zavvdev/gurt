import { redirect, Route } from '@tanstack/react-router';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';
import { isAuthenticated } from '~/application/features/auth/utilities';
import { rootRoute } from '~/presentation/router/rootRoute';
import { Home } from '~/presentation/pages/Home/Home';
import { ResendVerifyEmail } from '~/presentation/pages/VerifyEmail/ResendVerifyEmail';
import { VerifyEmail } from '~/presentation/pages/VerifyEmail/VerifyEmail';

const beforeLoad = () => {
  if (!isAuthenticated()) {
    throw redirect({
      to: PUBLIC_ROUTES.auth.login(),
    });
  }
};

const home = new Route({
  getParentRoute: () => rootRoute,
  path: PRIVATE_ROUTES.home(),
  component: Home,
  beforeLoad,
});

const resendVerifyEmail = new Route({
  getParentRoute: () => rootRoute,
  path: PRIVATE_ROUTES.resendVerifyEmail(),
  component: ResendVerifyEmail,
  beforeLoad,
});

const verifyEmail = new Route({
  getParentRoute: () => rootRoute,
  path: PRIVATE_ROUTES.verifyEmail(),
  component: VerifyEmail,
  beforeLoad,
});

export const privateRoutes = [home, resendVerifyEmail, verifyEmail];
