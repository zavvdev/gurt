import cx from 'clsx';
import { useEmptyLayoutStyles } from '~/presentation/layouts/Empty/EmptyLayout.styles';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function EmptyLayout({ children, className }: Props) {
  const classes = useEmptyLayoutStyles();

  return (
    <section className={classes.root}>
      <div className={cx(classes.content, className)}>{children}</div>
    </section>
  );
}
