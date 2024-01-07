import { Button } from 'antd';
import { useState } from 'react';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/application/features/auth/config';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { useChangePasswordStyles } from '~/presentation/pages/Settings/pages/Account/shared/ChangePassword/ChangePassword.styles';
import { Icons } from '~/presentation/assets/Icons';
import { Modal } from '~/presentation/pages/Settings/pages/Account/shared/ChangePassword/shared/Modal/Modal';

export function ChangePassword() {
  const { t } = useTranslation('common');
  const classes = useChangePasswordStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SettingItem label={t('label.password')}>
      <div className={classes.content}>
        <div className={classes.password}>
          {Array.from(Array(AUTH_PASSWORD_MIN_LENGTH).keys()).map((k) => (
            <span key={k} />
          ))}
        </div>
        <Button type="text" size="small" onClick={() => setIsModalOpen(true)}>
          <Icons.Pencil size="1.2rem" />
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SettingItem>
  );
}
