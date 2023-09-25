import { createUseStyles } from 'react-jss';

export const useLanguageSwitchStyles = createUseStyles(() => ({
  button: {
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      width: '1.5rem',
    },
  },
}));
