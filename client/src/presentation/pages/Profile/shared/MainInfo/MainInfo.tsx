import cn from 'clsx';
import { useMainInfoStyles } from '~/presentation/pages/Profile/shared/MainInfo/MainInfo.styles';

interface Props {
  name: string;
  username: string;
  className?: string;
}

export function MainInfo({ name, username, className }: Props) {
  const classes = useMainInfoStyles();

  return (
    <div className={cn(classes.root, className)}>
      <h2>{name}</h2>
      <div>@{username}</div>
    </div>
  );
}
