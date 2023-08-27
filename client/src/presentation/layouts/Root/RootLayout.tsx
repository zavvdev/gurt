import cx from 'clsx';
import { Montserrat } from 'next/font/google';
import '~/presentation/styles/globals.css';

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
        className={cx(
          FONT.className,
          'text-text dark:text-textDark bg-bg dark:bg-bgDark',
        )}
      >
        {children}
      </body>
    </html>
  );
}