import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useProfileStyles = createUseStyles(({ media }: JssTheme) => ({
  root: {
    maxWidth: '50rem',
    margin: '0 auto',
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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

    [media.maxXs]: {
      top: '-4rem',
    },
  },

  additionInfo: {
    position: 'relative',
    top: '-4.3rem',

    [media.maxXs]: {
      top: '-3rem',
    },
  },

  bio: {
    position: 'relative',
    top: '-2rem',

    [media.maxXs]: {
      top: '-1.5rem',
    },
  },
}));
