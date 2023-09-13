import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.number().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  email_verified_at: yup.string().nullable(),
});

export type User = yup.InferType<typeof userSchema>;
