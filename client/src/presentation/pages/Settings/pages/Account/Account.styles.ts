import { createUseStyles } from 'react-jss';

export const useAccountStyles = createUseStyles({
  content: {
    maxWidth: '52rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  row: {
    display: 'flex',
    gap: '1rem',
  },
});
