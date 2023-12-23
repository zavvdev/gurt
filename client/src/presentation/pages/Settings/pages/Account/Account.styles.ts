import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useAccountStyles = createUseStyles(({ media }: JssTheme) => ({
  content: {
    maxWidth: '52rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',

    '& *': {
      width: 'fit-content',

      [media.maxXs]: {
        width: 'initial',
      },
    },
  },
}));
