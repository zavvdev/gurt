import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDeleteAccount } from '~/application/features/account/useDeleteAccount';
import { Icons } from '~/presentation/assets/Icons';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function Delete() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const deleteAccount = useDeleteAccount({
    onError: () => {
      tCommon('error.deleteAccount');
    },
  });

  return (
    <>
      <Button
        danger
        type="text"
        onClick={() => setIsConfirmModalOpen(true)}
        loading={deleteAccount.isLoading}
        icon={<Icons.UserX2 size="1.2rem" />}
      >
        {t('account.delete.label')}
      </Button>
      <Modal
        title={t('account.delete.confirm.label')}
        open={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onOk={() => {
          setIsConfirmModalOpen(false);
          deleteAccount.initiate();
        }}
        cancelText={t('account.delete.confirm.cancel')}
        okText={t('account.delete.confirm.ok')}
      >
        {t('account.delete.confirm.text')}
      </Modal>
    </>
  );
}
