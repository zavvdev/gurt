'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
