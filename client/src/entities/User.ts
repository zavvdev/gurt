import * as yup from 'yup';

export const publicUserSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  username: yup.string().required(),
  email_verified_at: yup.string().nullable(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

export const userSchema = publicUserSchema.concat(
  yup.object({
    email: yup.string().required(),
  }),
);

export type User = yup.InferType<typeof userSchema>;

export type PublicUser = yup.InferType<typeof publicUserSchema>;
