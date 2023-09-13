import { NextResponse } from 'next/server';
import { createMiddleware } from '~/core/utilities/middleware';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '~/routes';

export const authMiddleware = createMiddleware((req, next) => {
  if (req.nextUrl.pathname.endsWith(PRIVATE_ROUTES.home())) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.auth.login(), req.url));
  }
  return next();
});
