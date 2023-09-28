import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from '~/presentation/router/publicRoutes';
import { privateRoutes } from '~/presentation/router/privateRoutes';
import { NotFound } from '~/presentation/pages/NotFound/NotFound';

export const router = createBrowserRouter([
  ...privateRoutes,
  ...publicRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);
