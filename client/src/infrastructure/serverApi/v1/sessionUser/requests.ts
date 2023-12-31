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

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangeEmailRequest {
  password: string;
  new_email: string;
}
