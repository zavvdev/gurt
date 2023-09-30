import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useVerifyEmailStyles = createUseStyles(({ media }: JssTheme) => ({
  layout: {
    display: 'flex',
    justifyContent: 'center',
  },

  root: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '6rem',
    flexDirection: 'column',

    [media.maxMd]: {
      paddingTop: '2.5rem',
      paddingBottom: '5rem',
      width: '100%',
    },
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  spinner: {
    marginBottom: '1rem',
  },

  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textAlign: 'center',

    [media.maxSm]: {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
      width: '100%',
    },
  },

  error: {
    width: '18rem',
  },

  tryAgainBtn: {
    [media.maxSm]: {
      width: '100%',
    },
  },

  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
}));
