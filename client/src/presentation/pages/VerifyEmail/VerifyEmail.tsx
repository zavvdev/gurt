import { useParams } from '@tanstack/react-router';
import { PRIVATE_ROUTES } from '~/routes';

export function VerifyEmail() {
  const params = useParams({
    from: PRIVATE_ROUTES.verifyEmail(),
  });

  return <div>Verify email {JSON.stringify(params)}</div>;
}
