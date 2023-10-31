import * as yup from 'yup';
import { useFormik } from 'formik';
import { RegisterForm } from '~/application/features/auth/register';
import {
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
  AUTH_USERNAME_MAX_LENGTH,
  AUTH_USERNAME_MIN_LENGTH,
  AUTH_USERNAME_REGEX,
} from '~/application/features/auth/config';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  onSubmit: (form: RegisterForm) => void;
}

export function useForm({ onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    name: yup
      .string()
      .required(t('formError.nameRequired'))
      .test({
        message: t('formError.nameLength'),
        test: (v) =>
          v.length >= AUTH_NAME_MIN_LENGTH && v.length <= AUTH_NAME_MAX_LENGTH,
      }),

    email: yup
      .string()
      .email(t('formError.emailInvalid'))
      .required(t('formError.emailRequired')),

    username: yup
      .string()
      .required(t('formError.usernameRequired'))
      .matches(AUTH_USERNAME_REGEX, t('formError.usernameInvalid'))
      .test({
        message: t('formError.usernameLength'),
        test: (v) =>
          v.length >= AUTH_USERNAME_MIN_LENGTH &&
          v.length <= AUTH_USERNAME_MAX_LENGTH,
      }),

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
      username: '',
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
