import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useImageStyles = createUseStyles(({ theme }: JssTheme) => ({
  upload: {
    height: '6rem',
    width: '6rem !important',

    '& .ant-upload, & .ant-upload-list, & .ant-upload-list-item-container, & .ant-upload-list-item':
      {
        borderRadius: theme.borderRadiusBase + 'px !important',
        height: '6rem !important',
        width: '6rem !important',
        marginInline: 'none',
        marginBlock: 'none',
        marginBottom: '0 !important',
        marginInlineEnd: '0 !important',
      },
  },

  skeleton: {
    '& span': {
      height: '6rem !important',
      width: '6rem !important',
      borderRadius: theme.borderRadiusBase + 'px',
    },
  },
}));
