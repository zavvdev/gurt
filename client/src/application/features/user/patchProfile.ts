import { UploadFile } from 'antd';

export interface PatchProfileForm {
  image: UploadFile | null;
  backgroundImage: UploadFile | null;
  name: string;
  username: string;
  bio: string | null;
  country: string | null;
  dateOfBirth: string | null;
}

export function usePatchProfile() {}
