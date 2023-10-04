import { RouteObject } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { Home } from '~/presentation/pages/Home/Home';
import { VerifyEmailResend } from '~/presentation/pages/VerifyEmailResend/VerifyEmailResend';
import { VerifyEmail } from '~/presentation/pages/VerifyEmail/VerifyEmail';
import { PrivateRouteGuard } from '~/presentation/router/shared/PrivateRouteGuard';
import { Profile } from '~/presentation/pages/Profile/Profile';
import { Settings } from '~/presentation/pages/Settings/Settings';

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
  {
    path: PRIVATE_ROUTES.profile(),
    element: (
      <PrivateRouteGuard>
        <Profile />
      </PrivateRouteGuard>
    ),
  },
  {
    path: PRIVATE_ROUTES.userProfile(),
    element: (
      <PrivateRouteGuard>
        <Profile />
      </PrivateRouteGuard>
    ),
  },
  {
    path: PRIVATE_ROUTES.settings(),
    element: (
      <PrivateRouteGuard>
        <Settings />
      </PrivateRouteGuard>
    ),
  },
];
