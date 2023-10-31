import { createUseStyles } from 'react-jss';

export const useSettingItemStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    gap: '0.75rem',
    flex: 1,
  },

  rootCol: {
    flexDirection: 'column',
    gap: '0.5rem',
  },

  label: {
    fontSize: '1rem',
    fontWeight: 'bolder',
    marginTop: '0.015rem',
  },
}));
