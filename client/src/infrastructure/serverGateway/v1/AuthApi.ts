import { Http } from '~/entities/Http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';

class AuthApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public async register(dto: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return this.http.post('/v1/auth/register', dto);
  }

  public async sendEmailVerification() {
    return this.http.post('/v1/auth/email/verification-notification');
  }
}

export const authApi = new AuthApi(serverGateway.http.web);
