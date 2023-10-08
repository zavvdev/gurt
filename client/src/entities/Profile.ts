import * as yup from 'yup';

export const profileSchema = yup.object({
  id: yup.number().required(),
  user_id: yup.number().required(),
  image_url: yup.string().required().nullable(),
  background_image_url: yup.string().required().nullable(),
  bio: yup.string().required().nullable(),
  date_of_birth: yup.string().required().nullable(),
  country: yup.string().required().nullable(),
  city: yup.string().required().nullable(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});

export type Profile = yup.InferType<typeof profileSchema>;
