import { Request, Response } from "express";
import { ApiResponseMessage } from "../types";
import { responseService } from "../services/ResponseService";

export function errorMiddleware(err: any, _: Request, res: Response) {
  if (err && Object.values(ApiResponseMessage).includes(err.message)) {
    return res.send(responseService.error(err.message));
  }
  return res.send(responseService.error(ApiResponseMessage.UnexpectedError));
}
