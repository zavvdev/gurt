'use client';

import NextTopLoader from 'nextjs-toploader';
import { useAppTheme } from '~/presentation/styles/theme';

export function AppProgress() {
  const theme = useAppTheme();
  return (
    <NextTopLoader color={theme.color.primary} height={3} showSpinner={false} />
  );
}
