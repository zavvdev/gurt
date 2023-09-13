import { NextMiddlewareResult } from 'next/dist/server/web/types';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

export function createMiddleware(
  fn: (
    req: NextRequest,
    next: () => NextMiddlewareResult | Promise<NextMiddlewareResult>,
  ) => NextMiddlewareResult | Promise<NextMiddlewareResult>,
): MiddlewareFactory {
  return (next: NextMiddleware) =>
    (req: NextRequest, _next: NextFetchEvent) => {
      return fn(req, () => next(req, _next));
    };
}
