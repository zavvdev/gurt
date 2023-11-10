import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';

class CommonApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1${path}`;
  }

  public ping() {
    return this.http.get(this.r('/ping'));
  }
}

export const commonApi = new CommonApi(serverApi.http.api);
