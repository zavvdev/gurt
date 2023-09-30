import { Http } from '~/entities/Http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '~/infrastructure/serverGateway/v1/auth/requests';
import {
  ServerResponse,
  ServerResponseStatus,
} from '~/infrastructure/serverGateway/types';
import { publicSessionId } from '~/infrastructure/serverGateway/utilities';

class AuthGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    const res = await this.http.post<ServerResponse, RegisterRequest>(
      '/v1/auth/register',
      dto,
    );
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.set();
    } else {
      publicSessionId.remove();
    }
    return res;
  }

  public async logout() {
    const res = await this.http.post<ServerResponse>('/v1/auth/logout');
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.remove();
    }
    return res;
  }

  public async login(dto: LoginRequest) {
    const res = await this.http.post<ServerResponse>('/v1/auth/login', dto);
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.set();
    } else {
      publicSessionId.remove();
    }
    return res;
  }

  public forgotPassword(dto: ForgotPasswordRequest) {
    return this.http.post<ServerResponse>('/v1/auth/forgot-password', dto);
  }

  public resetPassword(dto: ResetPasswordRequest) {
    return this.http.post<ServerResponse>('/v1/auth/reset-password', dto);
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
