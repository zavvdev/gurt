import * as yup from 'yup';
import { useFormik } from 'formik';
import { ForgotPasswordForm } from '~/application/features/auth/password/types';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  onSubmit: (form: ForgotPasswordForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    email: yup
      .string()
      .email(t('formError.emailInvalid'))
      .required(t('formError.emailRequired')),
  });

  const form = useFormik<ForgotPasswordForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      email: '',
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
