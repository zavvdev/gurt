import * as yup from 'yup';
import { ForgotPasswordForm } from '~/application/features/auth/password/types';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useExtendedFormik } from '~/presentation/utilities/hooks/useExtendedFormik';

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

  return useExtendedFormik<ForgotPasswordForm>({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
    onSubmit,
  });
}
