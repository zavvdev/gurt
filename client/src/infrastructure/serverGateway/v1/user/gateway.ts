import { Http } from '~/entities/Http';
import { User, userSchema } from '~/entities/api/User';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { validateResponse } from '~/infrastructure/serverGateway/utilities';

class UserGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async getSessionUser() {
    const response =
      await this.http.get<ServerResponse<User>>('/v1/user/session');
    return validateResponse(response, userSchema);
  }
}

export const userGateway = new UserGateway(serverGateway.http.api);
