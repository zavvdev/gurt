import '~/presentation/i18n';
import '~/presentation/styles/css/globals.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from '~/presentation/router';
import { StylesProvider } from '~/presentation/providers/StylesProvider';
import { QueryClientProvider } from '~/presentation/providers/QueryClientProvider';
import { NotificationOutlet } from '~/presentation/shared/NotificationOutlet/NotificationOutlet';
import { RootLayout } from '~/presentation/layouts/Root/RootLayout';
import { ErrorBoundary } from '~/presentation/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div />}>
        <StylesProvider>
          <QueryClientProvider>
            <RootLayout>
              <RouterProvider router={router} />
              <NotificationOutlet />
            </RootLayout>
          </QueryClientProvider>
        </StylesProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
