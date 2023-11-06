import { UserMediaType } from '~/infrastructure/serverApi/types';

export interface GetByUserIdRequest {
  userId: number;
}

export interface PatchMeRequest {
  bio?: string | null;
  date_of_birth?: string | null;
  country?: string | null;
}

export interface DeleteMyMediaRequest {
  url: string;
  type: UserMediaType;
}

export interface CreateMyMediaRequest {
  file: object;
  type: UserMediaType;
}
