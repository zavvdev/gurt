import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useBackgroundStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    root: {
      height: '10rem',
      width: '100%',
      borderRadius: theme.borderRadiusMedium + 'px',

      [media.maxXs]: {
        height: '7rem',
      },
    },
  }),
);
