import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useSkeletonStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    bg: {
      width: '100% !important',

      '& span': {
        width: '100%',
        height: '10rem !important',
        borderRadius: theme.borderRadiusMedium + 'px !important',

        [media.maxXs]: {
          height: '7rem !important',
        },
      },
    },

    avatar: {
      position: 'relative',
      top: '-7rem',
      background: theme.color.background,
      border: `0.3rem solid ${theme.color.background}`,
      borderRadius: theme.borderRadiusMedium,

      '& span': {
        borderRadius: theme.borderRadiusBase,
        height: '10rem !important',
        width: '10rem !important',

        [media.maxXs]: {
          height: '7rem !important',
          width: '7rem !important',
        },
      },

      [media.maxXs]: {
        top: '-5rem',
      },
    },

    mainInfo: {
      position: 'relative',
      top: '-6rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center',

      [media.maxXs]: {
        top: '-4rem',
      },
    },

    name: {
      '& span': {
        width: '17rem !important',

        [media.maxXs]: {
          width: '100% !important',
        },
      },
    },

    username: {
      '& span': {
        width: '11rem !important',

        [media.maxXs]: {
          width: '100% !important',
        },
      },
    },

    bio: {
      position: 'relative',
      top: '-4rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center',

      [media.maxXs]: {
        top: '-2rem',
      },

      '& > div': {
        width: '100%',
      },

      '& span': {
        width: '25rem !important',

        [media.maxXs]: {
          width: '15rem !important',
        },
      },

      '& > div:last-child span': {
        width: '15rem !important',

        [media.maxXs]: {
          width: '5rem !important',
        },
      },

      '& > div:first-child span': {
        width: '19rem !important',

        [media.maxXs]: {
          width: '8rem !important',
        },
      },

      '& > div:nth-child(3) span': {
        width: '20rem !important',

        [media.maxXs]: {
          width: '13rem !important',
        },
      },
    },
  }),
);
