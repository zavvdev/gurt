import { PropsWithChildren, Suspense } from 'react';
import { useRootLayoutStyles } from '~/presentation/layouts/Root/RootLayout.styles';

export function RootLayout({ children }: PropsWithChildren) {
  const classes = useRootLayoutStyles();
  return (
    <Suspense fallback={<div />}>
      <div className={classes.root}>{children}</div>
    </Suspense>
  );
}
