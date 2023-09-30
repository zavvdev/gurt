import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useEmptyLayoutStyles = createUseStyles(({ media }: JssTheme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },

  content: {
    width: '900px',
    padding: '2rem 2.5rem',

    [media.maxMd]: {
      width: '91.666667%',
      padding: '1.5rem 0',
    },
  },
}));
