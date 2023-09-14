import { Http } from '~/entities/Http';
import { serverGateway } from '~/infrastructure/serverGateway/serverGateway';
import { ServerResponse } from '~/infrastructure/serverGateway/types';

class EmailGateway {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public async sendVerification() {
    return this.http.post<ServerResponse>(
      '/v1/email/verification-notification',
    );
  }
}

export const emailGateway = new EmailGateway(serverGateway.http.web);
