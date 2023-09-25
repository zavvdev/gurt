import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginForm } from '~/application/features/auth/login';
import { useTranslation } from '~/presentation/i18n/useTranslation';

interface Args {
  onSubmit: (form: LoginForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    email: yup
      .string()
      .email(t('formError.emailInvalid'))
      .required(t('formError.emailRequired')),

    password: yup.string().required(t('formError.passwordRequired')),

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
