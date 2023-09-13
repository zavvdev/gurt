import { Http } from '~/entities/Http';
import { User, userSchema } from '~/entities/api/User';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { RegisterRequest } from '~/infrastructure/serverGateway/v1/auth/requests';

class AuthGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    const user = await this.http.post<User, RegisterRequest>(
      '/v1/auth/register',
      dto,
    );
    return userSchema.validateSync(user, { strict: true });
  }

  public async sendEmailVerification() {
    return this.http.post('/v1/auth/email/verification-notification');
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
