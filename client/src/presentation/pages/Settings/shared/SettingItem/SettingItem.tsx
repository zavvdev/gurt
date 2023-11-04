import { PropsWithChildren } from 'react';
import cn from 'clsx';
import { useSettingItemStyles } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem.styles';

interface Props extends PropsWithChildren {
  label: string;
  dir?: 'col' | 'row';
}

export function SettingItem({ children, label, dir = 'row' }: Props) {
  const classes = useSettingItemStyles();

  return (
    <div
      className={cn(classes.root, {
        [classes.rootCol]: dir === 'col',
      })}
    >
      <h3 className={classes.label}>{label}:</h3>
      {children}
    </div>
  );
}
