import { PropsWithChildren } from 'react';
import { useRootLayoutStyles } from '~/presentation/layouts/Root/RootLayout.styles';

export function RootLayout({ children }: PropsWithChildren) {
  const classes = useRootLayoutStyles();
  return <div className={classes.root}>{children}</div>;
}
