import * as yup from 'yup';
import { Alert, Modal as AntModal, Input, Typography } from 'antd';
import { ChangeEmailForm } from '~/application/features/account/types';
import { notificationService } from '~/application/services/NotificationService';
import { useChangeEmail } from '~/application/features/account/useChangeEmail';
import { getFirstExtractedValidationErrorEntry } from '~/application/utilities/general';
import { useSessionUserQuery } from '~/application/managers/queryClient/queries/sessionUser/useSessionUserQuery';
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

  const { data: sessionUser } = useSessionUserQuery();

  const changeEmail = useChangeEmail({
    onError: ({ validationErrors, message }) => {
      const { field, key } =
        getFirstExtractedValidationErrorEntry(validationErrors);

      if (key === 'already_exists' && field === 'newEmail') {
        return notificationService.error(tCommon('error.emailAlreadyUsed'));
      }

      notificationService.error(
        tCommon(`serverMessage.${message}`, t('account.changeEmail.error')),
      );
    },
    onSuccess: () => {
      notificationService.success(t('account.changeEmail.success'));
      onClose();
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, getError } =
    useExtendedFormik<ChangeEmailForm>({
      validationSchema: yup.object({
        currentPassword: yup
          .string()
          .required(tCommon('formError.currentPasswordRequired')),

        newEmail: yup
          .string()
          .email(tCommon('formError.emailInvalid'))
          .test({
            message: t('account.changeEmail.sameEmailError'),
            test: (v) => v !== sessionUser?.data?.email,
          })
          .required(tCommon('formError.emailRequired')),
      }),
      enableReinitialize: true,
      initialValues: {
        currentPassword: '',
        newEmail: '',
      },
      onSubmit: (values, { resetForm }) => {
        changeEmail.initiate(values).then(resetForm);
      },
    });

  return (
    <AntModal
      title={t('account.changeEmail.label')}
      open={isOpen}
      onCancel={onClose}
      onOk={() => handleSubmit()}
      cancelText={tCommon('label.cancel')}
      okText={t('account.changeEmail.submit')}
      confirmLoading={changeEmail.isLoading}
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
            placeholder={t('account.changeEmail.currentPasswordPlaceholder')}
            autoComplete="none"
          />
          {Boolean(getError('currentPassword')) && (
            <Typography.Text type="danger">
              {getError('currentPassword')}
            </Typography.Text>
          )}
        </div>
        <div>
          <Input
            size="large"
            name="newEmail"
            value={values.newEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            status={getError('newEmail') ? 'error' : undefined}
            placeholder={t('account.changeEmail.newEmailPlaceholder')}
          />
          {Boolean(getError('newEmail')) && (
            <Typography.Text type="danger">
              {getError('newEmail')}
            </Typography.Text>
          )}
        </div>
        <Alert
          showIcon
          message={t('account.changeEmail.description')}
          type="warning"
        />
      </div>
    </AntModal>
  );
}
