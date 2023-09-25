/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Route, Router } from '@tanstack/react-router';
import { Index } from '~/presentation/pages/Index';
import { rootRoute } from '~/presentation/router/rootRoute';
import { publicRoutes } from '~/presentation/router/publicRoutes';
import { privateRoutes } from '~/presentation/router/privateRoutes';
import { NotFound } from '~/presentation/pages/NotFound/NotFound';

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  // @ts-ignore
  ...publicRoutes,
  // @ts-ignore
  ...privateRoutes,
  // @ts-ignore
  notFoundRoute,
]);

export const router = new Router({ routeTree });
