import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useAvatarStyles = createUseStyles(({ theme }: JssTheme) => ({
  upload: {
    '& .ant-upload, .ant-upload-list-item': {
      borderRadius: theme.borderRadiusBase + 'px !important',
      height: '10rem !important',
      width: '10rem !important',
    },
  },
}));
