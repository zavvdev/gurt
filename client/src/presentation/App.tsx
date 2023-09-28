import '~/presentation/i18n';
import '~/presentation/styles/css/globals.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '~/presentation/router';
import { StylesProvider } from '~/presentation/providers/StylesProvider';
import { QueryClientProvider } from '~/presentation/providers/QueryClientProvider';
import { NotificationOutlet } from '~/presentation/shared/NotificationOutlet/NotificationOutlet';
import { RootLayout } from '~/presentation/layouts/Root/RootLayout';

export function App() {
  return (
    <StylesProvider>
      <QueryClientProvider>
        <RootLayout>
          <RouterProvider router={router} />
          <NotificationOutlet />
        </RootLayout>
      </QueryClientProvider>
    </StylesProvider>
  );
}
