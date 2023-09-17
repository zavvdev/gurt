import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginForm } from '~/core/features/auth/login';
import { useTranslation } from '~/presentation/i18n/useTranslation';

interface Args {
  onSubmit: (form: LoginForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('auth');

  const schema = yup.object({
    email: yup
      .string()
      .email(t('login.formError.emailInvalid'))
      .required(t('login.formError.emailRequired')),

    password: yup.string().required(t('login.formError.passwordRequired')),

    remember: yup.bool(),
  });

  const form = useFormik<LoginForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
      remember: false,
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
