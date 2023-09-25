import { Button, Typography } from 'antd';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useNotFoundStyles } from '~/presentation/pages/NotFound/NotFound.styles';

export function NotFound() {
  const { t } = useTranslation('common');
  const classes = useNotFoundStyles();

  return (
    <section className={classes.root}>
      <Typography.Title className={classes.code}>404</Typography.Title>
      <Typography.Text type="secondary" className={classes.label}>
        {t('notFoundPage.label')}
      </Typography.Text>
      <Button size="large">{t('notFoundPage.back')}</Button>
    </section>
  );
}
