import { UserMediaType } from '~/infrastructure/serverApi/types';

export interface PatchRequest {
  name?: string | null;
  username?: string | null;
  bio?: string | null;
  date_of_birth?: string | null;
  country?: string | null;
}

export interface CreateMediaRequest {
  file: object;
  type: UserMediaType;
}

export interface DeleteMediaRequest {
  url: string;
  type: UserMediaType;
}
