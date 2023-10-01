import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useGuestLayoutStyles = createUseStyles(
  ({ theme, media, isDark }: JssTheme) => ({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    header: {
      padding: '2rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [media.maxMd]: {
        flexDirection: 'column',
        gap: '1.5rem',
      },
    },

    logo: {
      color: isDark ? theme.color.text : theme.color.primary,
      width: '4.5rem',
    },

    nav: {
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',

      [media.maxMd]: {
        gap: '1.25rem',
        justifyContent: 'center',
      },
    },

    navItem: {
      padding: '0 0.5rem',
      color: theme.color.text,

      '&:hover': {
        backgroundColor: theme.color.primaryBg + ' !important',
      },
    },

    navItemActive: {
      backgroundColor: theme.color.primaryBg + ' !important',
    },

    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },

    content: {
      flex: 1,
      overflowY: 'scroll',
      padding: '0 5%',

      [media.maxMd]: {
        overflow: 'visible',
      },
    },
  }),
);
