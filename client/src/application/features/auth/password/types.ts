export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  email: string;
  password: string;
  passwordConfirm: string;
}
