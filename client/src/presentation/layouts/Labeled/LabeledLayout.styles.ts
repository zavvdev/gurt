import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useLabeledLayoutStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    head: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      padding: '2rem 5%',
      background: theme.color.background,
      zIndex: 10,
      borderBottom: `1px solid ${theme.color.gray1}`,
      left: 0,
      right: 0,

      [media.maxMd]: {
        padding: '1.5rem 5%',
      },
    },

    label: {
      fontSize: '2rem',
      fontWeight: 'bold',

      [media.maxSm]: {
        fontSize: '1.2rem',
      },
    },

    content: {
      paddingTop: '9rem',

      [media.maxMd]: {
        paddingTop: '8rem',
      },

      [media.maxSm]: {
        paddingTop: '7rem',
      },
    },

    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap',

      [media.maxSm]: {
        gap: '0.4rem',
      },
    },

    backBtn: {
      paddingRight: '0.05rem',
    },
  }),
);
