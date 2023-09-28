import { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'clsx';
import { Typography } from 'antd';
import { useLinkStyles } from '~/presentation/shared/Link/Link.styles';

interface Props extends PropsWithChildren {
  className?: string;
  to: string;
}

export function Link({ className, to, children }: Props) {
  const classes = useLinkStyles();

  return (
    <RouterLink to={to} className={cx(classes.root, className)}>
      <Typography.Text>{children}</Typography.Text>
    </RouterLink>
  );
}
