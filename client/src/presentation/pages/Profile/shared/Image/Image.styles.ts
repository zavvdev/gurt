import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useImageStyles = createUseStyles(({ theme, media }: JssTheme) => ({
  root: {
    borderRadius: theme.borderRadiusBase,
    height: '10rem',
    width: '10rem',

    [media.maxXs]: {
      height: '7rem',
      width: '7rem',
    },
  },
}));
