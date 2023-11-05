import { Profile, profileSchema } from '~/entities/Profile';
import { Http } from '~/infrastructure/http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { validateServerSuccessResponseData } from '~/infrastructure/serverGateway/utilities';
import {
  GetByUserIdRequest,
  PatchFromSessionRequest,
} from '~/infrastructure/serverGateway/v1/profiles/requests';

class ProfilesGateway {
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

  public patchFromSession(request: PatchFromSessionRequest) {
    const formData = new FormData();
    if (request.image) {
      formData.append('image', request.image as Blob);
    }
    if (request.background_image) {
      formData.append('background_image', request.background_image as Blob);
    }
    if (request.bio) {
      formData.append('bio', request.bio);
    }
    if (request.country) {
      formData.append('country', request.country);
    }
    if (request.date_of_birth) {
      formData.append('date_of_birth', request.date_of_birth);
    }
    return this.http.post(this.r('/session'), request, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export const profilesGateway = new ProfilesGateway(serverGateway.http.api);
