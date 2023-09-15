import * as yup from 'yup';
import { useFormik } from 'formik';
import { RegisterForm } from '~/core/features/auth/register';
import { useTranslation } from '~/presentation/i18n/useTranslation';

interface Args {
  onSubmit: (form: RegisterForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('auth');

  const schema = yup.object({
    firstName: yup.string().required(t('register.formError.firstNameRequired')),

    lastName: yup.string().required(t('register.formError.lastNameRequired')),

    email: yup
      .string()
      .email(t('register.formError.emailInvalid'))
      .required(t('register.formError.emailRequired')),

    password: yup
      .string()
      .test({
        message: t('register.formError.passwordMinimum', {
          length: 12,
        }),
        test: (v) => Boolean(v && v.length >= 12),
      })
      .required(t('register.formError.passwordRequired')),

    passwordConfirm: yup
      .string()
      .test({
        message: t('register.formError.passwordsNotMatch'),
        test: (v, c) => v === c.parent.password,
      })
      .required(t('register.formError.passwordConfirmRequired')),
  });

  const form = useFormik<RegisterForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
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
