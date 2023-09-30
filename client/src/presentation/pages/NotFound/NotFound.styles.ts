import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useNotFoundStyles = createUseStyles(
  ({ media, theme }: JssTheme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh',
      flexDirection: 'column',
      paddingTop: '10rem',

      [media.maxMd]: {
        gap: '0.5rem',
      },
    },

    code: {
      color: theme.color.gray6 + ' !important',
      opacity: 0.3 + ' !important',
      fontSize: '8rem !important',
      marginBottom: '0 !important',
    },

    label: {
      fontSize: '3.75rem',
      lineHeight: 1,
      fontWeight: '200',
      opacity: 0.8,
      marginBottom: '2rem',

      [media.maxMd]: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
      },
    },
  }),
);
