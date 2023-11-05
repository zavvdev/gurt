export interface GetByUserIdRequest {
  userId: number;
}

export interface PatchFromSessionRequest {
  image: object | string | null;
  background_image: object | string | null;
  bio: string | null;
  date_of_birth: string | null;
  country: string | null;
}
