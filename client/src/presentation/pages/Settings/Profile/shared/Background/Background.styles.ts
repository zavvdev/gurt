import { createUseStyles } from 'react-jss';
import { JssTheme } from '~/presentation/styles/types';

export const useBackgroundStyles = createUseStyles(
  ({ theme, media }: JssTheme) => ({
    upload: {
      height: '6rem',
      width: '30rem !important',

      [media.maxXs]: {
        width: '100% !important',
      },

      '& .ant-upload, & .ant-upload-list, & .ant-upload-list-item-container, & .ant-upload-list-item':
        {
          borderRadius: theme.borderRadiusBase + 'px !important',
          height: '6rem !important',
          width: '30rem !important',
          marginInline: 'none',
          marginBlock: 'none',
          marginBottom: '0 !important',
          marginInlineEnd: '0 !important',

          [media.maxXs]: {
            width: '100% !important',
          },
        },

      '& img': {
        objectFit: 'cover !important',
      },
    },
  }),
);
