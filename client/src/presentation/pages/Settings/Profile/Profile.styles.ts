import { createUseStyles } from 'react-jss';

export const useProfileStyles = createUseStyles(() => ({
  images: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
}));
