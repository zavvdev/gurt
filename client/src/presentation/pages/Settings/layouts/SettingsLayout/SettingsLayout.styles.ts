import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useSettingsLayoutStyles = createUseStyles(
  ({ media }: JssTheme) => ({
    root: {
      display: 'flex',
    },

    menu: {
      borderInlineEnd: 'none !important',
      position: 'fixed',
      maxWidth: '13rem',
      width: '13rem',
      background: 'transparent',

      [media.maxMd]: {
        position: 'static',
        width: '100%',
        maxWidth: '100%',
      },
    },

    menuItem: {
      paddingLeft: '0.75rem !important',
    },

    content: {
      paddingLeft: '15rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',

      [media.maxMd]: {
        paddingLeft: 0,
        gap: '1rem',
      },
    },
  }),
);
