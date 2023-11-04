import {
  PublicUser,
  publicUserSchema,
  User,
  userSchema,
} from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { validateServerSuccessResponseData } from '~/infrastructure/serverGateway/utilities';
import { PatchPublicDataFromSessionRequest } from '~/infrastructure/serverGateway/v1/users/requests';

class UsersGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/users${path}`;
  }

  public async getFromSession() {
    const response = await this.http.get<User>(this.r('/session'));
    return validateServerSuccessResponseData(response, userSchema);
  }

  public patchPublicDataFromSession(
    request: PatchPublicDataFromSessionRequest,
  ) {
    return this.http.patch(this.r('/session'), request);
  }

  public deleteSessionUser() {
    return this.http.delete(this.r('/session/delete'));
  }

  public async getById(id: number) {
    const response = await this.http.get<PublicUser>(this.r(`/${id}`));
    return validateServerSuccessResponseData(response, publicUserSchema);
  }
}

export const usersGateway = new UsersGateway(serverGateway.http.api);
