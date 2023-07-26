import { NextFunction, Response, Request } from 'express';
export declare const catchError: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
