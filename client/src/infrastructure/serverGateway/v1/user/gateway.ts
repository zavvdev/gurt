import {
  PublicUser,
  publicUserSchema,
  User,
  userSchema,
} from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { validateServerResponseData } from '~/infrastructure/serverGateway/utilities';

class UserGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/user${path}`;
  }

  public async getFromSession() {
    const response = await this.http.get<User>(this.r('/session'));
    return validateServerResponseData(response, userSchema);
  }

  public delete() {
    return this.http.delete(this.r('/delete'));
  }

  public async getById(id: number) {
    const response = await this.http.get<PublicUser>(this.r(`/${id}`));
    return validateServerResponseData(response, publicUserSchema);
  }
}

export const userGateway = new UserGateway(serverGateway.http.api);
