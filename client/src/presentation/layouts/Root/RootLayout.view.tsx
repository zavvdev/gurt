import { Montserrat } from 'next/font/google';
import '~/presentation/styles/globals.css';

const FONT = Montserrat({ subsets: ['latin', 'cyrillic-ext'] });

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={`${FONT.className} text-text dark:text-textDark bg-bg dark:bg-bgDark`}
      >
        {children}
      </body>
    </html>
  );
}
