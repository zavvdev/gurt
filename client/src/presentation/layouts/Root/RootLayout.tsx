import { twMerge } from 'tailwind-merge';
import { Montserrat } from 'next/font/google';
import { UINotificationContainer } from '~/presentation/shared/UINotificationContainer/UINotificationContainer';

const FONT = Montserrat({ subsets: ['latin', 'cyrillic-ext'] });

interface Props {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lng}>
      <body
        className={twMerge(
          FONT.className,
          'text-txt dark:text-txt_DT bg-bg dark:bg-bg_DT',
        )}
      >
        {children}
        <UINotificationContainer />
      </body>
    </html>
  );
}
