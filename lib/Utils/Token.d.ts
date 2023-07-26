import jwt from 'jsonwebtoken';
import { Response } from 'express';
export declare const signToken: (user: Pick<any, 'user_name' | 'type_login' | '_id'>) => string;
export declare const compareToken: (token: string) => string | jwt.JwtPayload;
export declare const createSendToken: (data: any, statusCode: number, res: Response) => Response<any, Record<string, any>>;
export declare const authJwt: () => {
    (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction): Promise<void>;
    unless: typeof import("express-unless").unless;
};
