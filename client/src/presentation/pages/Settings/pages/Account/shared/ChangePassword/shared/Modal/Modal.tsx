import * as yup from 'yup';
import { Modal as AntModal, Input, Typography } from 'antd';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/application/features/auth/config';
import { ChangePasswordForm } from '~/application/features/account/types';
import { useChangePassword } from '~/application/features/account/useChangePassword';
import { notificationService } from '~/application/services/NotificationService';
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

  const changePassword = useChangePassword({
    onError: (message) => {
      notificationService.error(
        tCommon(`serverMessage.${message}`, t('account.changePassword.error')),
      );
    },
    onSuccess: () => {
      notificationService.success(t('account.changePassword.success'));
      onClose();
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, getError } =
    useExtendedFormik<ChangePasswordForm>({
      validationSchema: yup.object({
        currentPassword: yup
          .string()
          .required(tCommon('formError.currentPasswordRequired')),

        newPassword: yup
          .string()
          .test({
            message: tCommon('formError.passwordMinimum', {
              length: AUTH_PASSWORD_MIN_LENGTH,
            }),
            test: (v) => Boolean(v && v.length >= AUTH_PASSWORD_MIN_LENGTH),
          })
          .test({
            message: t('account.changePassword.samePasswordError'),
            test: (v, c) => v !== c.parent.currentPassword,
          })
          .required(tCommon('formError.passwordRequired')),

        newPasswordConfirm: yup
          .string()
          .test({
            message: tCommon('formError.passwordsNotMatch'),
            test: (v, c) => v === c.parent.newPassword,
          })
          .required(tCommon('formError.passwordConfirmRequired')),
      }),
      enableReinitialize: true,
      initialValues: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
      onSubmit: (values, { resetForm }) => {
        changePassword.initiate(values).then(resetForm);
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
      confirmLoading={changePassword.isLoading}
    >
      <div className={classes.content}>
        <div>
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
            placeholder={t('account.changePassword.currentPlaceholder')}
            autoComplete="none"
          />
          {Boolean(getError('currentPassword')) && (
            <Typography.Text type="danger">
              {getError('currentPassword')}
            </Typography.Text>
          )}
        </div>
        <div>
          <Input.Password
            size="large"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            status={getError('newPassword') ? 'error' : undefined}
            iconRender={(visible) =>
              visible ? (
                <Icons.Eye size="1rem" color={theme.color.gray6} />
              ) : (
                <Icons.EyeOff size="1rem" color={theme.color.gray6} />
              )
            }
            placeholder={t('account.changePassword.newPlaceholder')}
            autoComplete="none"
          />
          {Boolean(getError('newPassword')) && (
            <Typography.Text type="danger">
              {getError('newPassword')}
            </Typography.Text>
          )}
        </div>
        <div>
          <Input.Password
            size="large"
            name="newPasswordConfirm"
            value={values.newPasswordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            status={getError('newPasswordConfirm') ? 'error' : undefined}
            iconRender={(visible) =>
              visible ? (
                <Icons.Eye size="1rem" color={theme.color.gray6} />
              ) : (
                <Icons.EyeOff size="1rem" color={theme.color.gray6} />
              )
            }
            placeholder={t('account.changePassword.newConfirmPlaceholder')}
            autoComplete="none"
          />
          {Boolean(getError('newPasswordConfirm')) && (
            <Typography.Text type="danger">
              {getError('newPasswordConfirm')}
            </Typography.Text>
          )}
        </div>
      </div>
    </AntModal>
  );
}
