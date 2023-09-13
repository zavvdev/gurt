import { stackMiddlewares } from '~/core/utilities/middleware';
import { authMiddleware } from '~/core/auth/middleware';
import { i18nMiddleware } from '~/presentation/i18n/middleware';

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export default stackMiddlewares([authMiddleware, i18nMiddleware]);
