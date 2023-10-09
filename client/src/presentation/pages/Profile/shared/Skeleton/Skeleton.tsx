import { Skeleton as AntSkeleton } from 'antd';
import { useSkeletonStyles } from '~/presentation/pages/Profile/shared/Skeleton/Skeleton.styles';

export function Skeleton() {
  const classes = useSkeletonStyles();

  return (
    <div className={classes.root}>
      <AntSkeleton.Input active className={classes.bg} />
      <AntSkeleton.Avatar
        active
        size="large"
        shape="square"
        className={classes.avatar}
      />
      <div className={classes.info}>
        <AntSkeleton.Input active className={classes.name} />
        <AntSkeleton.Input active className={classes.username} />
      </div>
    </div>
  );
}
