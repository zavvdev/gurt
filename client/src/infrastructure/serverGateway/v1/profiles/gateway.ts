import { Profile, profileSchema } from '~/entities/Profile';
import { Http } from '~/infrastructure/http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { validateServerSuccessResponseData } from '~/infrastructure/serverGateway/utilities';
import { GetByUserIdRequest } from '~/infrastructure/serverGateway/v1/profiles/requests';

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
}

export const profilesGateway = new ProfilesGateway(serverGateway.http.api);
