import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useAdditionInfoStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',

      [media.maxXs]: {
        flexDirection: 'column',
        gap: '0.5rem',
      },
    },

    row: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem',
      fontSize: '0.8rem',
      color: theme.color.gray7,
    },
  }),
);
