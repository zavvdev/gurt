import { Typography } from 'antd';
import cn from 'clsx';
import { PropsWithChildren } from 'react';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useBioStyles } from '~/presentation/pages/Profile/shared/Bio/Bio.styles';

interface Props extends PropsWithChildren {
  className?: string;
}

export function Bio({ children, className }: Props) {
  const { t } = useTranslation('profile');
  const classes = useBioStyles();

  return (
    <Typography.Paragraph
      className={cn(classes.root, className)}
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: t('bio.more'),
      }}
    >
      {children}
    </Typography.Paragraph>
  );
}
