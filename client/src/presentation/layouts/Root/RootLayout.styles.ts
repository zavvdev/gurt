import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useRootLayoutStyles = createUseStyles(({ theme }: JssTheme) => ({
  root: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: theme.color.background + ' !important',
    color: theme.color.text + ' !important',
  },
}));
