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
import { BIO_MAX_LENGTH } from '~/application/features/settings/profile/config';
import { ProfileSettingsForm } from '~/application/features/settings/profile/types';
import { dateService } from '~/application/services/DateService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { useExtendedFormik } from '~/presentation/utilities/hooks/useExtendedFormik';

interface Args {
  initialValues: ProfileSettingsForm;
  onSubmit: (values: ProfileSettingsForm) => void;
}

export function useForm({ initialValues, onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
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

    imageUrl: yup.string().nullable(),

    backgroundImageUrl: yup.string().nullable(),

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

  return useExtendedFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
    validationSchema: schema,
  });
}
