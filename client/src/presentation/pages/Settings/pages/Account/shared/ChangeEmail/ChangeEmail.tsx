import { Button, Skeleton } from 'antd';
import { useState } from 'react';
import { useSessionUserQuery } from '~/application/managers/queryClient/queries/sessionUser/useSessionUserQuery';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { useChangeEmailStyles } from '~/presentation/pages/Settings/pages/Account/shared/ChangeEmail/ChangeEmail.styles';
import { Icons } from '~/presentation/assets/Icons';
import { Modal } from '~/presentation/pages/Settings/pages/Account/shared/ChangeEmail/shared/Modal/Modal';

export function ChangeEmail() {
  const { t } = useTranslation('common');
  const classes = useChangeEmailStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: sessionUser, isLoading: isSessionUserLoading } =
    useSessionUserQuery();

  return (
    <SettingItem label={t('label.email')}>
      <div className={classes.content}>
        {isSessionUserLoading ? (
          <Skeleton.Input active size="small" />
        ) : (
          sessionUser?.data?.email
        )}
        <Button type="text" size="small" onClick={() => setIsModalOpen(true)}>
          <Icons.Pencil size="1.2rem" />
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SettingItem>
  );
}
