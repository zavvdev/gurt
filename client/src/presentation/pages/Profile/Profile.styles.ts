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

    mainInfo: {
      position: 'relative',
      top: '-5.5rem',
      textAlign: 'center',

      [media.maxXs]: {
        top: '-4rem',
      },

      '& h2': {
        fontSize: '1.8rem',
        fontWeight: 'bold',

        [media.maxXs]: {
          fontSize: '1.5rem',
        },
      },

      '& div': {
        fontSize: '1.2rem',
        color: theme.color.gray7,

        [media.maxXs]: {
          fontSize: '1rem',
        },
      },
    },

    additionInfo: {
      position: 'relative',
      top: '-4.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',

      [media.maxXs]: {
        top: '-3rem',
        flexDirection: 'column',
        gap: '0.5rem',
      },
    },

    additionInfoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem',
      fontSize: '0.9rem',
      color: theme.color.gray7,
    },
  }),
);
