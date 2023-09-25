import '~/presentation/i18n/setup';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/presentation/router';
import { UINotificationContainer } from '~/presentation/shared/UINotificationContainer/UINotificationContainer';
import { QueryClientProvider } from '~/presentation/providers/QueryClientProvider';
import { AntDesignProvider } from '~/presentation/providers/AntDesignProvider';

export function App() {
  return (
    <AntDesignProvider>
      <QueryClientProvider>
        <RouterProvider router={router} />
        <UINotificationContainer />
      </QueryClientProvider>
    </AntDesignProvider>
  );
}
