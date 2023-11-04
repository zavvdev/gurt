import { Skeleton as AntSkeleton } from 'antd';
import { useSkeletonStyles } from '~/presentation/pages/Settings/Profile/shared/Skeleton/Skeleton.styles';

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
      <div className={classes.mainInfo}>
        <AntSkeleton.Input active size="small" className={classes.name} />
        <AntSkeleton.Input active size="small" className={classes.username} />
      </div>
      <div className={classes.bio}>
        <AntSkeleton.Input active size="small" />
        <AntSkeleton.Input active size="small" />
        <AntSkeleton.Input active size="small" />
        <AntSkeleton.Input active size="small" />
      </div>
    </div>
  );
}
