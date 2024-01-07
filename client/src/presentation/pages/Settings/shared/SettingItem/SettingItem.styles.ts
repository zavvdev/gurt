import { createUseStyles } from 'react-jss';

export const useSettingItemStyles = createUseStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '0.5rem',
  },

  label: {
    fontSize: '1rem',
    fontWeight: 'bolder',
    marginTop: '0.015rem',
  },
});
