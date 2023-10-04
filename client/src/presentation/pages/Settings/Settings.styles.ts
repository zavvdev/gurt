import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useSettingsStyles = createUseStyles(({ media }: JssTheme) => ({
  root: {
    display: 'flex',
    gap: '2rem',

    [media.maxMd]: {
      gap: 0,
    },
  },

  menu: {
    borderInlineEnd: 'none !important',
    position: 'fixed',
    maxWidth: '13rem',
    width: '13rem',
    background: 'transparent',

    [media.maxMd]: {
      display: 'none',
    },
  },

  menuItem: {
    paddingLeft: '0.75rem !important',
  },

  content: {
    paddingLeft: '15rem',

    [media.maxMd]: {
      paddingLeft: 0,
    },
  },

  mobileMenu: {
    display: 'none',

    [media.maxMd]: {
      display: 'block',
    },
  },
}));
