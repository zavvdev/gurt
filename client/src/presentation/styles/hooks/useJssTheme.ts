import { useTheme } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export function useJssTheme() {
  return useTheme<JssTheme>();
}
