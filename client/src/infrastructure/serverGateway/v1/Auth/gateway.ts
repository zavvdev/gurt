import { Http } from '~/entities/Http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import {
  LoginRequest,
  RegisterRequest,
} from '~/infrastructure/serverGateway/v1/auth/requests';
import { ServerResponse } from '~/infrastructure/serverGateway/types';

class AuthGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    return this.http.post<ServerResponse, RegisterRequest>(
      '/v1/auth/register',
      dto,
    );
  }

  public async logout() {
    return this.http.post<ServerResponse>('/v1/auth/logout');
  }

  public async login(dto: LoginRequest) {
    return this.http.post<ServerResponse>('/v1/auth/login', dto);
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
