import { User, userSchema } from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import {
  removeNullishFromRequestPayload,
  validateServerSuccessResponseData,
} from '~/infrastructure/serverApi/utilities';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  PatchRequest,
} from '~/infrastructure/serverApi/v1/sessionUser/requests';

class SessionUserApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string = '') {
    return `/v1/me${path}`;
  }

  public async get() {
    const response = await this.http.get<User>(this.r());
    return validateServerSuccessResponseData(response, userSchema);
  }

  public del() {
    return this.http.delete(this.r());
  }

  public patch(request: PatchRequest) {
    return this.http.patch(this.r(), removeNullishFromRequestPayload(request));
  }

  public changePassword(request: ChangePasswordRequest) {
    return this.http.put(this.r('/password'), request);
  }

  public changeEmail(request: ChangeEmailRequest) {
    return this.http.put(this.r('/email'), request);
  }
}

export const sessionUserApi = new SessionUserApi(serverApi.http.api);
