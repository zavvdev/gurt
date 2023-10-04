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

  private r(path: string) {
    return `/v1/user${path}`;
  }

  public async getFromSession() {
    const response = await this.http.get<ServerResponse<User>>(
      this.r('/session'),
    );
    return validateResponse(response, userSchema);
  }

  public delete() {
    return this.http.delete<ServerResponse>(this.r('/delete'));
  }
}

export const userGateway = new UserGateway(serverGateway.http.api);
