import { Request, Response } from 'express';
import { responseService } from '../services/ResponseService';
import { ApiResponseMessage, NodeError } from '../types';
import { CONFIG } from '../config';

export function errorMiddleware(err: NodeError, _: Request, res: Response) {
  if (
    err &&
    Object.values(ApiResponseMessage).includes(
      err.message as ApiResponseMessage,
    )
  ) {
    return res
      .status(409)
      .send(responseService.error(err.message as ApiResponseMessage));
  }
  if (CONFIG.env === 'production') {
    return res
      .status(500)
      .send(responseService.error(ApiResponseMessage.UnexpectedError));
  }
  return res.status(500).send(err);
}
