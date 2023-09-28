import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useLinkStyles = createUseStyles(({ theme }: JssTheme) => ({
  root: {
    '& *': {
      color: theme.color.primary,
    },

    '&:hover': {
      '& *': {
        textDecoration: 'underline',
      },
    },
  },
}));
