import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useProfileStyles = createUseStyles(({ media }: JssTheme) => ({
  content: {
    maxWidth: '52rem',
  },

  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',

    [media.maxSm]: {
      flexDirection: 'column',
    },
  },

  images: {
    marginBottom: '2rem',
  },

  footer: {
    marginTop: '2rem',
  },
}));
