import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { createMiddleware } from '~/core/utilities/middleware';
import {
  FALLBACK_LNG,
  I18N_COOKIE_NAME,
  LANGUAGES,
} from '~/presentation/i18n/config';

acceptLanguage.languages(Object.values(LANGUAGES));

export const i18nMiddleware = createMiddleware((req, next) => {
  let lng: string | null | undefined = Object.values(LANGUAGES).find((l) =>
    req.nextUrl.pathname.startsWith(`/${l}`),
  );

  if (!lng && req.cookies.has(I18N_COOKIE_NAME)) {
    lng = acceptLanguage.get(req.cookies.get(I18N_COOKIE_NAME)?.value);
  }

  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }

  if (!lng) {
    lng = FALLBACK_LNG;
  }

  if (
    !Object.values(LANGUAGES).some((loc) =>
      req.nextUrl.pathname.startsWith(`/${loc}`),
    ) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.cookies.get(I18N_COOKIE_NAME)?.value !== lng) {
    const response = NextResponse.next();
    response.cookies.set(I18N_COOKIE_NAME, lng);
    return response;
  }

  return next();
});
