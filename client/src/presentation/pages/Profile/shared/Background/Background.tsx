import { observer } from 'mobx-react';
import { PROFILE_DEFAULT_IMAGES } from '~/presentation/config/general';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/types';
import { useBackgroundStyles } from '~/presentation/pages/Profile/shared/Background/Background.styles';

interface Props {
  url: string | null;
}

export const Background = observer(({ url }: Props) => {
  const classes = useBackgroundStyles();

  const defaultImage =
    themeStore.resolvedTheme === ThemeType.Dark
      ? PROFILE_DEFAULT_IMAGES.background.dark
      : PROFILE_DEFAULT_IMAGES.background.light;

  const background = `url(${
    url || defaultImage
  }) no-repeat center center / cover`;

  return <div className={classes.root} style={{ background }} />;
});
