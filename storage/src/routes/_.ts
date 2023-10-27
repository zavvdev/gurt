import { NextFunction, Request, Response } from 'express';
import { NodeError, ReqBody } from '../types';
import { errorMiddleware } from '../middlewares/errorMiddleware';

export function _<T, R>(
  executor: (
    req: ReqBody<T>,
    res: Response,
    next: NextFunction,
  ) => void | R | Promise<void | R>,
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await executor(req, res, next);
      return result;
    } catch (err) {
      errorMiddleware(err as NodeError, req, res);
    }
  };
}
