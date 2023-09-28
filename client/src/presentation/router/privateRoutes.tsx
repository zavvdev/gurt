import { RouteObject } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { Home } from '~/presentation/pages/Home/Home';
import { ResendVerifyEmail } from '~/presentation/pages/VerifyEmail/ResendVerifyEmail';
import { VerifyEmail } from '~/presentation/pages/VerifyEmail/VerifyEmail';
import { AuthWrapper } from '~/presentation/router/shared/AuthWrapper';

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_ROUTES.home(),
    element: (
      <AuthWrapper>
        <Home />
      </AuthWrapper>
    ),
  },
  {
    path: PRIVATE_ROUTES.resendVerifyEmail(),
    element: (
      <AuthWrapper>
        <ResendVerifyEmail />
      </AuthWrapper>
    ),
  },
  {
    path: PRIVATE_ROUTES.verifyEmail(),
    element: (
      <AuthWrapper>
        <VerifyEmail />
      </AuthWrapper>
    ),
  },
];
