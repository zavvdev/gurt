import { Roboto } from 'next/font/google';
import { UINotificationContainer } from '~/presentation/shared/UINotificationContainer/UINotificationContainer';
import { QueryClientProvider } from '~/presentation/providers/QueryClientProvider';
import { ThemeProvider } from '~/presentation/providers/ThemeProvider/ThemeProvider';
import { cn } from '~/presentation/utilities/styles';
import { AppProgress } from '~/presentation/shared/AppProgress/AppProgress';

const APP_FONT = Roboto({
  subsets: ['latin-ext'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

interface Props {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lng}>
      <body className={cn(APP_FONT.className, 'text-text dark:text-text_DT')}>
        <QueryClientProvider>
          <ThemeProvider locale={params.lng}>
            <AppProgress />
            {children}
            <UINotificationContainer />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
