import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useVerifyEmailResendStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    layout: {
      display: 'flex',
      justifyContent: 'center',
    },

    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '6rem',
      flexDirection: 'column',
      width: '24rem',

      [media.maxMd]: {
        paddingTop: '2.5rem',
        paddingBottom: '5rem',
        width: '100%',
      },
    },

    icon: {
      width: '6rem',
      height: '6rem',
      color: theme.color.gray6,
      marginBottom: '1rem',
      opacity: '0.5',
    },

    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      width: '24rem',
      textAlign: 'center',

      [media.maxSm]: {
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        width: '100%',
      },
    },

    description: {
      marginBottom: '2.5rem',
      width: '20rem',
      textAlign: 'center',
    },

    resendBtn: {
      [media.maxSm]: {
        width: '100%',
      },
    },

    logoutBtn: {
      marginTop: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
  }),
);
