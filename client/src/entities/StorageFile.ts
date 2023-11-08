import * as yup from 'yup';

export const storageFileSchema = yup.string().required();

export type StorageFile = yup.InferType<typeof storageFileSchema>;
