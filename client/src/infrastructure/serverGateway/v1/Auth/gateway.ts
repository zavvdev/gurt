import { Http } from '~/entities/Http';
import { User, userSchema } from '~/entities/api/User';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { RegisterRequest } from '~/infrastructure/serverGateway/v1/auth/requests';
import {
  ServerResponse,
  ServerResponseMessage,
} from '~/infrastructure/serverGateway/types';
import { validateResponse } from '~/infrastructure/serverGateway/utilities';

class AuthGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async csrfCookie() {
    return this.http.get('/v1/sanctum/csrf-cookie');
  }

  public async register(dto: RegisterRequest) {
    const response = await this.http.post<
      ServerResponse<User>,
      RegisterRequest
    >('/v1/auth/register', dto);
    return validateResponse(response, userSchema, (response) => {
      return response?.message !== ServerResponseMessage.AlreadyLoggedIn;
    });
  }

  public async logout() {
    return this.http.post<ServerResponse>('/v1/auth/logout');
  }
}

export const authGateway = new AuthGateway(serverGateway.http.web);
