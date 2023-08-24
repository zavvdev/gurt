import '~/presentation/styles/globals.css';
import { FONT } from '~/presentation/config/general';

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
