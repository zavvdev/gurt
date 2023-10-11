import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useMainInfoStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    root: {
      textAlign: 'center',

      '& h2': {
        fontSize: '1.8rem',
        fontWeight: 'bold',

        [media.maxXs]: {
          fontSize: '1.5rem',
        },
      },

      '& div': {
        fontSize: '1.2rem',
        color: theme.color.gray7,

        [media.maxXs]: {
          fontSize: '1rem',
        },
      },
    },
  }),
);
