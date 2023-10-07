import * as yup from 'yup';

export const profileSchema = yup.object({
  id: yup.number().required(),
  user_id: yup.number().required(),
  image_url: yup.string().nullable(),
  background_image_url: yup.string().nullable(),
  bio: yup.string().nullable(),
  date_of_birth: yup.string().nullable(),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

export type Profile = yup.InferType<typeof profileSchema>;
