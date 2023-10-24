import { NextFunction, Request, Response } from "express";
import { errorMiddleware } from "../middlewares/errorMiddleware";

export function _(executor: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      return executor(req, res, next);
    } catch (err) {
      errorMiddleware(err, req, res);
    }
  };
}
