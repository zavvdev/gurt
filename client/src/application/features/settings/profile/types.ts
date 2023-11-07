export interface ProfileSettingsForm {
  name: string;
  username: string;
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}
