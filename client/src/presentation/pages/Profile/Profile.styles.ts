import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useProfileStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    root: {
      maxWidth: '50rem',
      margin: '0 auto',
    },

    profile: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    bg: {
      height: '10rem',
      width: '100%',
      borderRadius: theme.borderRadiusMedium + 'px',

      [media.maxXs]: {
        height: '7rem',
      },
    },

    avatar: {
      position: 'relative',
      top: '-7rem',

      [media.maxXs]: {
        top: '-5rem',
      },
    },
  }),
);
