import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useChangePasswordStyles = createUseStyles(
  ({ theme }: JssTheme) => ({
    content: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },

    password: {
      display: 'flex',
      gap: '0.5rem',

      '& span': {
        width: '0.35rem',
        height: '0.35rem',
        borderRadius: '50%',
        backgroundColor: theme.color.text,
      },
    },
  }),
);
