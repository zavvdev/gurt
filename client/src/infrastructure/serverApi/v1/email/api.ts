import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import { VerifyRequest } from '~/infrastructure/serverApi/v1/email/requests';

class EmailApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public sendVerification() {
    return this.http.post('/v1/email/verification-notification');
  }

  public verify(dto: VerifyRequest) {
    return this.http.get(`/v1/verify-email/${dto.id}/${dto.hash}`, {
      params: {
        expires: dto.expires,
        signature: dto.signature,
      },
    });
  }
}

export const emailApi = new EmailApi(serverApi.http.web);
