export interface PatchRequest {
  name?: string | null;
  username?: string | null;
  profile?: {
    image_url?: string | null;
    background_image_url?: string | null;
    bio?: string | null;
    date_of_birth?: string | null;
    country?: string | null;
  };
}
