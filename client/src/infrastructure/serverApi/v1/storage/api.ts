import { StorageFile, storageFileSchema } from '~/entities/StorageFile';
import { Http } from '~/infrastructure/http';
import { serverApi } from '~/infrastructure/serverApi/serverApi';
import { UploadFileRequest } from '~/infrastructure/serverApi/v1/storage/requests';
import { validateServerSuccessResponseData } from '~/infrastructure/serverApi/utilities';

class StorageApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private r(path: string) {
    return `/v1/storage${path}`;
  }

  public async uploadFile(request: UploadFileRequest) {
    const formData = new FormData();

    formData.append('file', request.file as Blob);

    const response = await this.http.post<StorageFile>(
      this.r('/file'),
      request,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return validateServerSuccessResponseData(response, storageFileSchema);
  }
}

export const storageApi = new StorageApi(serverApi.http.api);
