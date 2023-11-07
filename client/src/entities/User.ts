import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  email_verified_at: yup.string().required().nullable(),
  profile: yup
    .object({
      image_url: yup.string().required().nullable(),
      background_image_url: yup.string().required().nullable(),
      bio: yup.string().required().nullable(),
      date_of_birth: yup.string().required().nullable(),
      country: yup.string().required().nullable(),
    })
    .required(),
});

export const publicUserSchema = userSchema.omit(['email']);

export type User = yup.InferType<typeof userSchema>;
export type PublicUser = yup.InferType<typeof publicUserSchema>;
