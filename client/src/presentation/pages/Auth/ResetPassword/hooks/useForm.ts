import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useSearch } from '@tanstack/react-router';
import { PUBLIC_ROUTES } from '~/routes';
import { ResetPasswordForm } from '~/application/features/auth/password';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/application/features/auth/config';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

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

  const params = useParams({
    from: PUBLIC_ROUTES.auth.resetPassword(),
  });

  const searchParams = useSearch({
    from: PUBLIC_ROUTES.auth.resetPassword(),
  });

  const token = params.token;
  const email = searchParams.email;

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
