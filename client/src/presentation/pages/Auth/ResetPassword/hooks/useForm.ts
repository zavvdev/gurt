import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useSearchParams } from 'next/navigation';
import { ResetPasswordForm } from '~/core/features/auth/password';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/core/features/auth/config';
import { useTranslation } from '~/presentation/i18n/useTranslation';

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
  const { t } = useTranslation('auth');

  const params = useParams();
  const searchParams = useSearchParams();

  const token = params.token as string;
  const email = searchParams.get('email');

  const schema = yup.object({
    email: yup
      .string()
      .email(t('resetPassword.formError.emailInvalid'))
      .required(t('resetPassword.formError.emailRequired')),

    password: yup
      .string()
      .test({
        message: t('resetPassword.formError.passwordMinimum', {
          length: AUTH_PASSWORD_MIN_LENGTH,
        }),
        test: (v) => Boolean(v && v.length >= AUTH_PASSWORD_MIN_LENGTH),
      })
      .required(t('register.formError.passwordRequired')),

    passwordConfirm: yup
      .string()
      .test({
        message: t('resetPassword.formError.passwordsNotMatch'),
        test: (v, c) => v === c.parent.password,
      })
      .required(t('resetPassword.formError.passwordConfirmRequired')),
  });

  const form = useFormik<ResetPasswordForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      email: email || '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (form) => onSubmit({ form, token }),
  });

  const getError = (field: keyof typeof form.values) => {
    if (form.touched[field] && form.errors[field]) {
      return form.errors[field];
    }
  };

  return {
    ...form,
    getError,
  };
}
