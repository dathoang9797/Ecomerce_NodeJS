import { NextFunction, Response, Request } from 'express';
import { AppErrorHandling } from './AppErrorHanding';

export const catchError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: AppErrorHandling) => next(err));
  };
};
