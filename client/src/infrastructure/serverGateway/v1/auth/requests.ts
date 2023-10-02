export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  login: string;
  password: string;
  remember: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}
