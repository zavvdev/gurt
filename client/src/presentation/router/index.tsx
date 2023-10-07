import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from '~/presentation/router/publicRoutes';
import { privateRoutes } from '~/presentation/router/privateRoutes';
import { NotFound } from '~/presentation/pages/NotFound/NotFound';
import { Index } from '~/presentation/pages/Index';
import { ErrorElement } from '~/presentation/router/shared/ErrorElement';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Index />,
    },
    ...privateRoutes,
    ...publicRoutes,
    {
      path: '*',
      element: <NotFound />,
    },
  ].map((r) => ({ ...r, errorElement: <ErrorElement /> })),
);
