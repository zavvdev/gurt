import { NextFunction, Request, Response } from 'express';
import { NodeError } from '../types';
import { errorMiddleware } from '../middlewares/errorMiddleware';

export function _(
  executor: (req: Request, res: Response, next: NextFunction) => void,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      return executor(req, res, next);
    } catch (err) {
      errorMiddleware(err as NodeError, req, res);
    }
  };
}
