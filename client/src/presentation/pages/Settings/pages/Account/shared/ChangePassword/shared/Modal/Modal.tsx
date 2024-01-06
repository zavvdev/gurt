import * as yup from 'yup';
import { Modal as AntModal, Input } from 'antd';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useExtendedFormik } from '~/presentation/utilities/hooks/useExtendedFormik';
import { Icons } from '~/presentation/assets/Icons';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';
import { useModalStyles } from '~/presentation/pages/Settings/pages/Account/shared/ChangePassword/shared/Modal/Modal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: Props) {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const { theme } = useJssTheme();
  const classes = useModalStyles();

  const { values, handleBlur, handleChange, handleSubmit, getError } =
    useExtendedFormik({
      validationSchema: yup.object({
        currentPassword: yup.string().required(t('formError.passwordRequired')),
      }),
      enableReinitialize: true,
      initialValues: {
        currentPassword: '',
      },
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <AntModal
      title={t('account.changePassword.label')}
      open={isOpen}
      onCancel={onClose}
      onOk={() => handleSubmit()}
      cancelText={tCommon('label.cancel')}
      okText={t('account.changePassword.submit')}
      confirmLoading={false}
    >
      <div className={classes.content}>
        {t('account.changePassword.description')}
        <Input.Password
          size="large"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          status={getError('currentPassword') ? 'error' : undefined}
          iconRender={(visible) =>
            visible ? (
              <Icons.Eye size="1rem" color={theme.color.gray6} />
            ) : (
              <Icons.EyeOff size="1rem" color={theme.color.gray6} />
            )
          }
          placeholder={t('account.changePassword.placeholder')}
          autoComplete="none"
        />
      </div>
    </AntModal>
  );
}
