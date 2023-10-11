import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useBioStyles = createUseStyles(({ theme }: JssTheme) => ({
  root: {
    maxWidth: '28rem',
    textAlign: 'center',

    '& a': {
      color: theme.color.gray7 + ' !important',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));
