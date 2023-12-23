import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useLogout } from '~/application/features/auth/logout/useLogout';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function Logout() {
  const { t } = useTranslation('settings');
  const logout = useLogout();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <>
      <Button
        danger
        onClick={() => setIsConfirmModalOpen(true)}
        loading={logout.isLoading}
        icon={<Icons.LogOut size="1.2rem" />}
      >
        {t('account.logout.label')}
      </Button>
      <Modal
        title={t('account.logout.confirm.label')}
        open={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onOk={() => {
          setIsConfirmModalOpen(false);
          logout.initiate();
        }}
        cancelText={t('account.logout.confirm.cancel')}
        okText={t('account.logout.confirm.ok')}
      >
        {t('account.logout.confirm.text')}
      </Modal>
    </>
  );
}
