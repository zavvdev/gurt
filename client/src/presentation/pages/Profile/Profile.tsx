import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useProfile } from '~/presentation/pages/Profile/hooks/useProfile';

export function Profile() {
  const profile = useProfile();

  return (
    <UserLayout>
      <pre>
        {profile.isLoading
          ? 'Loading... '
          : JSON.stringify(profile.data, null, 2)}
      </pre>
    </UserLayout>
  );
}
