export interface GetByUserIdRequest {
  userId: number;
}

export interface PatchFromSessionRequest {
  image: object | null;
  background_image: object | null;
  bio: string | null;
  date_of_birth: string | null;
  country: string | null;
}
