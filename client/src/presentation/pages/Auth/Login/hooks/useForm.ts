import * as yup from 'yup';
import { LoginForm } from '~/application/features/auth/login/types';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useExtendedFormik } from '~/presentation/utilities/hooks/useExtendedFormik';

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

  return useExtendedFormik<LoginForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      login: '',
      password: '',
      remember: false,
    },
    onSubmit,
  });
}
