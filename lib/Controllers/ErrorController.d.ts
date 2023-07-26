import { Response, Request, NextFunction } from 'express';
import { CastError, Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { AppErrorHandling } from "../Utils/AppErrorHanding";
export type ErrorCastError = AppErrorHandling & CastError;
export type ErrorMongo = AppErrorHandling & MongoError;
export type ErrorValidator = AppErrorHandling & Error.ValidationError;
export declare const ErrorController: (err: AppErrorHandling, req: Request, res: Response, next: NextFunction) => void;
