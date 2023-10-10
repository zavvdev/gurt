import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useProfile } from '~/presentation/pages/Profile/hooks/useProfile';
import { Skeleton } from '~/presentation/pages/Profile/shared/Skeleton/Skeleton';
import { useProfileStyles } from '~/presentation/pages/Profile/Profile.styles';
import { Image } from '~/presentation/pages/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Profile/shared/Background/Background';

export function Profile() {
  const profile = useProfile();
  const classes = useProfileStyles();

  return (
    <UserLayout>
      <div className={classes.root}>
        {profile.isLoading ? (
          <Skeleton />
        ) : (
          <div className={classes.profile}>
            <Background url={profile.data.backgroundImageUrl} />
            <Image url={profile.data.imageUrl} className={classes.avatar} />
          </div>
        )}
      </div>
    </UserLayout>
  );
}
