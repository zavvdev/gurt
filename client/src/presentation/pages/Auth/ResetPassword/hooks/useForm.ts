import * as yup from 'yup';
import { useParams, useSearchParams } from 'react-router-dom';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/application/features/auth/config';
import { ResetPasswordForm } from '~/application/features/auth/password/types';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useExtendedFormik } from '~/presentation/utilities/hooks/useExtendedFormik';

interface Args {
  onSubmit: ({
    form,
    token,
  }: {
    form: ResetPasswordForm;
    token: string;
  }) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');
  const params = useParams();
  const [searchParams] = useSearchParams();

  const token = params.token || '';
  const email = searchParams.get('email') || '';

  const schema = yup.object({
    email: yup
      .string()
      .email(t('formError.emailInvalid'))
      .required(t('formError.emailRequired')),

    password: yup
      .string()
      .test({
        message: t('formError.passwordMinimum', {
          length: AUTH_PASSWORD_MIN_LENGTH,
        }),
        test: (v) => Boolean(v && v.length >= AUTH_PASSWORD_MIN_LENGTH),
      })
      .required(t('formError.passwordRequired')),

    passwordConfirm: yup
      .string()
      .test({
        message: t('formError.passwordsNotMatch'),
        test: (v, c) => v === c.parent.password,
      })
      .required(t('formError.passwordConfirmRequired')),
  });

  return useExtendedFormik<ResetPasswordForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      email: email || '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (form) => onSubmit({ form, token }),
  });
}
