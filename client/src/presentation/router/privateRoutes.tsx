import { RouteObject } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { Home } from '~/presentation/pages/Home/Home';
import { VerifyEmailResend } from '~/presentation/pages/VerifyEmailResend/VerifyEmailResend';
import { VerifyEmail } from '~/presentation/pages/VerifyEmail/VerifyEmail';
import { PrivateRouteGuard } from '~/presentation/router/shared/PrivateRouteGuard';

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_ROUTES.home(),
    element: (
      <PrivateRouteGuard>
        <Home />
      </PrivateRouteGuard>
    ),
  },
  {
    path: PRIVATE_ROUTES.resendVerifyEmail(),
    element: (
      <PrivateRouteGuard>
        <VerifyEmailResend />
      </PrivateRouteGuard>
    ),
  },
  {
    path: PRIVATE_ROUTES.verifyEmail(),
    element: (
      <PrivateRouteGuard>
        <VerifyEmail />
      </PrivateRouteGuard>
    ),
  },
];
