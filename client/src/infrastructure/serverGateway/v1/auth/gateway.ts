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

  private r(path: string) {
    return `/v1/auth${path}`;
  }

  public csrfCookie() {
    return this.http.get<ServerResponse>('/v1/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    const res = await this.http.post<ServerResponse, RegisterRequest>(
      this.r('/register'),
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
    const res = await this.http.post<ServerResponse>(this.r('/logout'));
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.remove();
    }
    return res;
  }

  public async login(dto: LoginRequest) {
    const res = await this.http.post<ServerResponse>(this.r('/login'), dto);
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.set();
    } else {
      publicSessionId.remove();
    }
    return res;
  }

  public forgotPassword(dto: ForgotPasswordRequest) {
    return this.http.post<ServerResponse>(this.r('/forgot-password'), dto);
  }

  public resetPassword(dto: ResetPasswordRequest) {
    return this.http.post<ServerResponse>(this.r('/reset-password'), dto);
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
