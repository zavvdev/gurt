'use client';

import { redirect } from 'next/navigation';
import { PRIVATE_ROUTES, useCreateRoute } from '~/routes';

export default function Root() {
  const { r } = useCreateRoute();
  redirect(r(PRIVATE_ROUTES.home()));
}
