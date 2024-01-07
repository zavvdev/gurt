import { FormikConfig, FormikValues, useFormik } from 'formik';

export function useExtendedFormik<Values extends FormikValues = FormikValues>(
  args: FormikConfig<Values>,
) {
  const form = useFormik(args);

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
