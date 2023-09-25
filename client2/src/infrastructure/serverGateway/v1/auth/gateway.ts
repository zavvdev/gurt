import { Http } from '~/entities/Http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '~/infrastructure/serverGateway/v1/auth/requests';
import { ServerResponse } from '~/infrastructure/serverGateway/types';

class AuthGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public register(dto: RegisterRequest) {
    return this.http.post<ServerResponse, RegisterRequest>(
      '/v1/auth/register',
      dto,
    );
  }

  public logout() {
    return this.http.post<ServerResponse>('/v1/auth/logout');
  }

  public login(dto: LoginRequest) {
    return this.http.post<ServerResponse>('/v1/auth/login', dto);
  }

  public forgotPassword(dto: ForgotPasswordRequest) {
    return this.http.post<ServerResponse>('/v1/auth/forgot-password', dto);
  }

  public resetPassword(dto: ResetPasswordRequest) {
    return this.http.post<ServerResponse>('/v1/auth/reset-password', dto);
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
