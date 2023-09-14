import { NextResponse } from 'next/server';
import { createMiddleware } from '~/core/utilities/middleware';
import { SESSION_COOKIE_NAME } from '~/infrastructure/serverGateway/config';
import { PRIVATE_ROUTES_LIST, PUBLIC_ROUTES } from '~/routes';

export const authMiddleware = createMiddleware((req, next) => {
  if (
    !req.cookies.get(SESSION_COOKIE_NAME) &&
    PRIVATE_ROUTES_LIST.some((route) => req.nextUrl.pathname.endsWith(route))
  ) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.auth.login(), req.url));
  }
  return next();
});
