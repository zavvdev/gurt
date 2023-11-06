import {
  PublicUser,
  publicUserSchema,
  User,
  userSchema,
} from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import {
  removeNullishFromRequestPayload,
  validateServerSuccessResponseData,
} from '~/infrastructure/serverApi/utilities';
import { PatchMyPublicDataRequest } from '~/infrastructure/serverApi/v1/users/requests';

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

  public async getMe() {
    const response = await this.http.get<User>(this.r('/me'));
    return validateServerSuccessResponseData(response, userSchema);
  }

  public deleteMe() {
    return this.http.delete(this.r('/me'));
  }

  public patchMyPublicData(request: PatchMyPublicDataRequest) {
    return this.http.patch(
      this.r('/me/public-data'),
      removeNullishFromRequestPayload(request),
    );
  }
}

export const usersApi = new UsersApi(serverApi.http.api);
