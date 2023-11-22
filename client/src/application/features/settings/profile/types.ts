export interface ProfileSettingsForm {
  name: string;
  username: string;
  imageUrl: string | null;
  backgroundImageUrl: string | null;
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}
