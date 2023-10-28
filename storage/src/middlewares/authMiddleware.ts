import { NextFunction, Request, Response } from 'express';
import { CONFIG } from '../config';
import { ApiResponseMessage } from '../types';
import { responseService } from '../services/ResponseService';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = req.headers.secret || null;
  if (secret === CONFIG.secret) {
    next();
  } else {
    res.status(403).send(responseService.error(ApiResponseMessage.Forbidden));
  }
}
