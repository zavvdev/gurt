import { Button } from 'antd';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { UserLayout } from '~/presentation/layouts/User/UserLayout';

export function Settings() {
  const { t } = useTranslation('settings');

  return (
    <UserLayout>
      <div>
        <Button type="primary" danger>
          {t('account.delete.button')}
        </Button>
      </div>
    </UserLayout>
  );
}
