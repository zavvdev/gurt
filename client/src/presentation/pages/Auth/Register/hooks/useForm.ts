import * as yup from 'yup';
import { useFormik } from 'formik';
import { RegisterForm } from '~/application/features/auth/register';
import { AUTH_PASSWORD_MIN_LENGTH } from '~/application/features/auth/config';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  onSubmit: (form: RegisterForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    name: yup.string().required(t('formError.nameRequired')),

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

  const form = useFormik<RegisterForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit,
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
