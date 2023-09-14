import { NextResponse } from 'next/server';
import { createMiddleware } from '~/core/utilities/middleware';
import { PUBLIC_ROUTES } from '~/routes';

export const authMiddleware = createMiddleware((req, next) => {
  if (req.nextUrl.pathname.endsWith('/some')) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.auth.login(), req.url));
  }
  return next();
});
