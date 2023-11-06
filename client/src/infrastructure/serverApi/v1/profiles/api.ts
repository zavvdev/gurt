import { Profile, profileSchema } from '~/entities/Profile';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import {
  removeNullishFromRequestPayload,
  validateServerSuccessResponseData,
} from '~/infrastructure/serverApi/utilities';
import {
  CreateMyMediaRequest,
  DeleteMyMediaRequest,
  GetByUserIdRequest,
  PatchMeRequest,
} from '~/infrastructure/serverApi/v1/profiles/requests';

class ProfilesApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/profiles${path}`;
  }

  public async getByUserId(request: GetByUserIdRequest) {
    const response = await this.http.get<Profile>(
      this.r(`/user/${request.userId}`),
    );
    return validateServerSuccessResponseData(response, profileSchema);
  }

  public patchMe(request: PatchMeRequest) {
    return this.http.patch(
      this.r('/me'),
      removeNullishFromRequestPayload(request),
    );
  }

  public createMyMedia(request: CreateMyMediaRequest) {
    const formData = new FormData();
    formData.append('file', request.file as Blob);
    formData.append('type', request.type);
    return this.http.post(this.r('/me/media'), request, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  public deleteMyMedia(request: DeleteMyMediaRequest) {
    return this.http.delete(this.r('/me/media'), {
      params: {
        url: request.url,
        type: request.type,
      },
    });
  }
}

export const profilesApi = new ProfilesApi(serverApi.http.api);
