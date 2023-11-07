import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  BIO_MAX_LENGTH,
  UpdateProfileForm,
} from '~/application/features/sessionUser/updateData';
import { dateService } from '~/application/services/DateService';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

interface Args {
  initialValues: UpdateProfileForm;
  onSubmit: (values: UpdateProfileForm) => void;
}

export function useForm({ initialValues, onSubmit }: Args) {
  const { t } = useTranslation('common');

  const schema = yup.object({
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
