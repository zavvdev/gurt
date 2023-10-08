import { Http } from '~/infrastructure/http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { VerifyRequest } from '~/infrastructure/serverGateway/v1/email/requests';

class EmailGateway {
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

export const emailGateway = new EmailGateway(serverGateway.http.web);
