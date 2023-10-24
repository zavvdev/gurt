import { Request, Response } from 'express';
import { responseService } from '../services/ResponseService';
import { ApiResponseMessage, NodeError } from '../types';

export function errorMiddleware(err: NodeError, _: Request, res: Response) {
  if (
    err &&
    Object.values(ApiResponseMessage).includes(
      err.message as ApiResponseMessage,
    )
  ) {
    return res.send(responseService.error(err.message as ApiResponseMessage));
  }
  return res.send(responseService.error(ApiResponseMessage.UnexpectedError));
}
