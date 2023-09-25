'use client';

import { useState } from 'react';
import { QueryClientProvider as QCProvider } from '@tanstack/react-query';
import { createQueryClient } from '~/core/managers/queryClient';

interface Props {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState(() => createQueryClient());
  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
