import { useParams } from '@tanstack/react-router';
import { PUBLIC_ROUTES } from '~/routes';

export function ResetPassword() {
  const params = useParams({
    from: PUBLIC_ROUTES.auth.resetPassword('$token'),
  });

  return <div>Reset password {JSON.stringify(params)}</div>;
}
