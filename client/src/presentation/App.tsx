import '~/presentation/i18n/setup';
import '~/presentation/styles/css/globals.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/presentation/router';
import { StylesProvider } from '~/presentation/providers/StylesProvider';
import { QueryClientProvider } from '~/presentation/providers/QueryClientProvider';
import { NotificationOutlet } from '~/presentation/shared/NotificationOutlet/NotificationOutlet';

export function App() {
  return (
    <StylesProvider>
      <QueryClientProvider>
        <RouterProvider router={router} />
        <NotificationOutlet />
      </QueryClientProvider>
    </StylesProvider>
  );
}
