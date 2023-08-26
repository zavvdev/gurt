import cx from 'clsx';
import { dir } from 'i18next';
import { FONT } from '~/presentation/config/general';
import '~/presentation/styles/globals.css';

interface Props {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
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
