import { UploadFile } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_USERNAME_MAX_LENGTH,
  AUTH_USERNAME_MIN_LENGTH,
  AUTH_USERNAME_REGEX,
} from '~/application/features/auth/config';
import {
  isAuthNameLengthValid,
  isAuthUsernameLengthValid,
} from '~/application/features/auth/utilities';
import {
  BIO_MAX_LENGTH,
  PatchProfileForm,
} from '~/application/features/user/patchProfile';
import { dateService } from '~/application/services/DateService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  initialValues: PatchProfileForm;
  onSubmit: (values: PatchProfileForm) => void;
}

export function useForm({ initialValues, onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
    image: yup.object<UploadFile>().nullable(),

    backgroundImage: yup.object<UploadFile>().nullable(),

    name: yup
      .string()
      .required(t('formError.nameRequired'))
      .test({
        message: t('formError.nameLength', {
          min: AUTH_NAME_MIN_LENGTH,
          max: AUTH_NAME_MAX_LENGTH,
        }),
        test: isAuthNameLengthValid,
      }),

    username: yup
      .string()
      .required(t('formError.usernameRequired'))
      .matches(AUTH_USERNAME_REGEX, t('formError.usernameInvalid'))
      .test({
        message: t('formError.usernameLength', {
          min: AUTH_USERNAME_MIN_LENGTH,
          max: AUTH_USERNAME_MAX_LENGTH,
        }),
        test: isAuthUsernameLengthValid,
      }),

    bio: yup
      .string()
      .max(
        BIO_MAX_LENGTH,
        t('formError.textMax', {
          max: BIO_MAX_LENGTH,
        }),
      )
      .nullable(),

    country: yup.string().nullable(),

    dateOfBirth: yup
      .date()
      .test({
        message: t('formError.dateOfBirthInvalid'),
        test: (v) => (v ? dateService.isValidDateOfBirth(v) : true),
      })
      .nullable(),
  });

  const form = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
    validationSchema: schema,
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
