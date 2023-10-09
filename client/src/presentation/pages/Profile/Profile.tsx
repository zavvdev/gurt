import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useProfile } from '~/presentation/pages/Profile/hooks/useProfile';
import { Skeleton } from '~/presentation/pages/Profile/shared/Skeleton/Skeleton';
import { useProfileStyles } from '~/presentation/pages/Profile/Profile.styles';

export function Profile() {
  const profile = useProfile();
  const classes = useProfileStyles();

  return (
    <UserLayout>
      <div className={classes.root}>
        {profile.isLoading ? (
          <Skeleton />
        ) : (
          JSON.stringify(profile.data, null, 2)
        )}
      </div>
    </UserLayout>
  );
}
