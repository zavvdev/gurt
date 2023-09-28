import { RouteObject } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';
import { Home } from '~/presentation/pages/Home/Home';
import { VerifyEmailResend } from '~/presentation/pages/VerifyEmailResend/VerifyEmailResend';
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
        <VerifyEmailResend />
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
