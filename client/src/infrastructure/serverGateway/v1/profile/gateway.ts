import { Http } from '~/entities/Http';
import { Profile, profileSchema } from '~/entities/api/Profile';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';
import { validateResponse } from '~/infrastructure/serverGateway/utilities';
import { GetByUserIdRequest } from '~/infrastructure/serverGateway/v1/profile/requests';

class ProfileGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/profile${path}`;
  }

  public async getByUserId(request: GetByUserIdRequest) {
    const response = await this.http.get<ServerResponse<Profile>>(
      this.r(`/user/${request.userId}`),
    );
    return validateResponse(response, profileSchema);
  }
}

export const profileGateway = new ProfileGateway(serverGateway.http.api);
