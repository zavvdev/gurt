import { PropsWithChildren } from 'react';
import { useSettingItemStyles } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem.styles';

interface Props extends PropsWithChildren {
  label: string;
}

export function SettingItem({ children, label }: Props) {
  const classes = useSettingItemStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.label}>{label}:</h3>
      {children}
    </div>
  );
}
