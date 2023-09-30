import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useNotFoundStyles } from '~/presentation/pages/NotFound/NotFound.styles';

export function NotFound() {
  const { t } = useTranslation('common');
  const classes = useNotFoundStyles();
  const navigate = useNavigate();

  return (
    <section className={classes.root}>
      <Typography.Title className={classes.code}>404</Typography.Title>
      <Typography.Text type="secondary" className={classes.label}>
        {t('notFoundPage.label')}
      </Typography.Text>
      <Button size="large" onClick={() => navigate(-1)}>
        {t('notFoundPage.back')}
      </Button>
    </section>
  );
}
