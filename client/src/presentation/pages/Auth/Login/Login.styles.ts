import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useLoginStyles = createUseStyles(({ media }: JssTheme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: '2.5rem',
    flexDirection: 'column',

    [media.maxMd]: {
      paddingTop: '1.25rem',
      paddingBottom: '5rem',
    },
  },

  form: {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',

    [media.maxXs]: {
      width: '100%',
    },
  },

  formError: {
    marginTop: '0.25rem',
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.25rem',
  },
}));
