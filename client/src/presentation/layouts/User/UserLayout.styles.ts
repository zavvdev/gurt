import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useUserLayoutStyles = createUseStyles(
  ({ theme, isDark, media }: JssTheme) => ({
    root: {
      minHeight: '100%',
      padding: '2rem 5% 10rem 5%',
    },

    nav: {
      position: 'fixed',
      bottom: '5%',
      left: '5%',
      right: '5%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(0, 0, 0, 0.7)',
      borderRadius: theme.borderRadiusMedium,
      padding: '0.5rem',
      backdropFilter: isDark ? 'blur(6px)' : 'blur(8px)',
      gap: '0.5rem',
      transition: 'all 0.5s ease',
      margin: '0 auto',
      width: 'fit-content',
      flexWrap: 'wrap',

      '&:hover': {
        backdropFilter: 'none',
        backgroundColor: theme.color.backgroundInverted,
      },

      [media.maxSm]: {
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        borderRadius: 0,
        justifyContent: 'space-evenly',
      },
    },

    navButton: {
      height: '3rem',
      width: '3.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borderRadiusBase,
      background: 'transparent',
      color: theme.color.textInverted,
      transition: 'all 0.3s ease',

      '&:hover': {
        backgroundColor: isDark ? '#e9e9e9' : '#393939',
      },

      [media.maxSm]: {
        height: '2.3rem',
        width: '2.6rem',

        '& svg': {
          height: '1.4rem',
        },
      },
    },

    navButtonActive: {
      position: 'relative',

      '&::after': {
        content: "''",
        position: 'absolute',
        bottom: '0.2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '0.2rem',
        width: '0.2rem',
        borderRadius: '50%',
        backgroundColor: theme.color.textInverted,

        [media.maxSm]: {
          bottom: 0,
        },
      },
    },
  }),
);
