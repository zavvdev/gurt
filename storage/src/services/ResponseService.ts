import { ApiResponse, ApiResponseMessage, ApiResponseStatus } from '../types';

class ResponseService {
  private composeResponse<T>(
    status: ApiResponseStatus,
    data?: T,
    message?: ApiResponseMessage,
  ): ApiResponse<T> {
    return {
      status,
      message: message || null,
      data: data || null,
    };
  }

  public success<T>(data?: T, message?: ApiResponseMessage) {
    return this.composeResponse(ApiResponseStatus.Success, data, message);
  }

  public error<T>(message?: ApiResponseMessage, data?: T) {
    return this.composeResponse(ApiResponseStatus.Error, data, message);
  }
}

export const responseService = new ResponseService();
