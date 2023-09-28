import { createUseStyles } from 'react-jss';

export const useThemeSwitchStyles = createUseStyles(() => ({
  button: {
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      width: '1.5rem',
    },
  },

  icon: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      height: '1.25rem',
      width: '1.25rem',
      marginRight: '0.5rem',
    },
  },
}));
