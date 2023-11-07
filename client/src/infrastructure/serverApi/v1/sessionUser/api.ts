import { User, userSchema } from '~/entities/User';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import {
  removeNullishFromRequestPayload,
  validateServerSuccessResponseData,
} from '~/infrastructure/serverApi/utilities';
import {
  CreateMediaRequest,
  DeleteMediaRequest,
  PatchRequest,
} from '~/infrastructure/serverApi/v1/sessionUser/requests';

class SessionUserApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path?: string) {
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

  public createMedia(request: CreateMediaRequest) {
    const formData = new FormData();
    formData.append('file', request.file as Blob);
    formData.append('type', request.type);
    return this.http.post(this.r('/media'), request, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  public deleteMyMedia(request: DeleteMediaRequest) {
    return this.http.delete(this.r('/media'), {
      params: {
        url: request.url,
        type: request.type,
      },
    });
  }
}

export const sessionUserApi = new SessionUserApi(serverApi.http.api);
