import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginForm } from '~/application/features/auth/login';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  onSubmit: (form: LoginForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    login: yup.lazy((v: string) => {
      if (v?.includes('@')) {
        return yup
          .string()
          .email(t('formError.emailInvalid'))
          .required(t('formError.loginRequired'));
      }
      return yup.string().required(t('formError.loginRequired'));
    }),

    password: yup.string().required(t('formError.passwordRequired')),

    remember: yup.bool(),
  });

  const form = useFormik<LoginForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      login: '',
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
