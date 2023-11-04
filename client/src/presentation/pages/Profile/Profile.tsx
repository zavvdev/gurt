import { UserLayout } from '~/presentation/layouts/User/UserLayout';
import { useProfile } from '~/presentation/pages/Profile/hooks/useProfile';
import { Skeleton } from '~/presentation/pages/Profile/shared/Skeleton/Skeleton';
import { useProfileStyles } from '~/presentation/pages/Profile/Profile.styles';
import { Image } from '~/presentation/pages/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Profile/shared/Background/Background';
import { AdditionInfo } from '~/presentation/pages/Profile/shared/AdditionInfo/AdditionInfo';
import { MainInfo } from '~/presentation/pages/Profile/shared/MainInfo/MainInfo';
import { Bio } from '~/presentation/pages/Profile/shared/Bio/Bio';

export function Profile() {
  const { data: profile, isLoading } = useProfile();
  const classes = useProfileStyles();

  return (
    <UserLayout>
      <div className={classes.root}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className={classes.profile}>
            <Background url={profile.backgroundImageUrl} />
            <Image url={profile.imageUrl} className={classes.avatar} />
            <MainInfo
              name={profile.name || ''}
              username={profile.username || ''}
              className={classes.mainInfo}
            />
            <AdditionInfo
              country={profile.country}
              dateOfBirth={profile.dateOfBirth}
              className={classes.additionInfo}
            />
            <Bio className={classes.bio}>{profile.bio}</Bio>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
