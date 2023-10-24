import {
  ApiResponse,
  ApiResponseData,
  ApiResponseMessage,
  ApiResponseStatus,
} from "../types";

class ResponseService {
  private composeResponse(
    status: ApiResponseStatus,
    data?: ApiResponseData,
    message?: ApiResponseMessage,
  ): ApiResponse {
    return {
      status,
      message: message || null,
      data: data || null,
    };
  }

  public success(data: ApiResponseData, message?: ApiResponseMessage) {
    return this.composeResponse(ApiResponseStatus.Success, data, message);
  }

  public error(message?: ApiResponseMessage, data?: ApiResponseData) {
    return this.composeResponse(ApiResponseStatus.Error, data, message);
  }
}

export const responseService = new ResponseService();
