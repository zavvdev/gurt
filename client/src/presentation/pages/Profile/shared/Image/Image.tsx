import { observer } from 'mobx-react';
import cn from 'clsx';
import { PROFILE_DEFAULT_IMAGES } from '~/presentation/config/general';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/types';
import { useImageStyles } from '~/presentation/pages/Profile/shared/Image/Image.styles';

interface Props {
  url: string | null;
  className?: string;
}

export const Image = observer(({ url, className }: Props) => {
  const classes = useImageStyles();

  const defaultImage =
    themeStore.resolvedTheme === ThemeType.Dark
      ? PROFILE_DEFAULT_IMAGES.image.dark
      : PROFILE_DEFAULT_IMAGES.image.light;

  const background = `url(${
    url || defaultImage
  }) no-repeat center center / cover`;

  return <div className={cn(classes.root, className)} style={{ background }} />;
});
