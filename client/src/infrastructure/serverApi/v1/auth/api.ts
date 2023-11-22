import { serverApi } from '~/infrastructure/serverApi/serverApi';
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '~/infrastructure/serverApi/v1/auth/requests';
import { ServerResponseStatus } from '~/infrastructure/serverApi/types';
import { publicSessionId } from '~/infrastructure/serverApi/utilities';
import { Http } from '~/infrastructure/http';

class AuthApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/auth${path}`;
  }

  public csrfCookie() {
    return this.http.get('/v1/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    const res = await this.http.post(this.r('/register'), dto);
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.set();
    } else {
      publicSessionId.remove();
    }
    return res;
  }

  public async logout() {
    const res = await this.http.post(this.r('/logout'));
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.remove();
    }
    return res;
  }

  public async login(dto: LoginRequest) {
    const res = await this.http.post(this.r('/login'), dto);
    if (res.status === ServerResponseStatus.Success) {
      publicSessionId.set();
    } else {
      publicSessionId.remove();
    }
    return res;
  }

  public forgotPassword(dto: ForgotPasswordRequest) {
    return this.http.post(this.r('/forgot-password'), dto);
  }

  public resetPassword(dto: ResetPasswordRequest) {
    return this.http.post(this.r('/reset-password'), dto);
  }
}

export const authApi = new AuthApi(serverApi.http.web);
