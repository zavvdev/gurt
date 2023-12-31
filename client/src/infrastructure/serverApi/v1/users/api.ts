import { PublicUser, publicUserSchema } from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import { validateServerSuccessResponseData } from '~/infrastructure/serverApi/utilities';

class UsersApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/users${path}`;
  }

  public async getById(id: number) {
    const response = await this.http.get<PublicUser>(this.r(`/${id}`));
    return validateServerSuccessResponseData(response, publicUserSchema);
  }
}

export const usersApi = new UsersApi(serverApi.http.api);
