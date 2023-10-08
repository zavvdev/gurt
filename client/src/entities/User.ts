import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  email_verified_at: yup.string().required().nullable(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

export const publicUserSchema = userSchema.omit(['email']);

export type User = yup.InferType<typeof userSchema>;
export type PublicUser = yup.InferType<typeof publicUserSchema>;
