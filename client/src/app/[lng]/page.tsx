import { redirect } from 'next/navigation';
import { PRIVATE_ROUTES } from '~/routes';

export default function Root() {
  redirect(PRIVATE_ROUTES.home());
}
