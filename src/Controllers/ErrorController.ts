import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { CastError, Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { MessageLog } from '@Utils/MessageLog';
import { Response, Request, NextFunction } from 'express';

export type ErrorCastError = AppErrorHandling & CastError;

export type ErrorMongo = AppErrorHandling & MongoError;

export type ErrorValidator = AppErrorHandling & Error.ValidationError;

const { errorSomeThingWrong, errorDuplicate, errorCastMongoose, errorValidation, errorInvalidToken, errorTokenExpired } = MessageLog;

const sendErrorDev = (err: AppErrorHandling, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppErrorHandling, res: Response) => {
  //isOperational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or other unknown error: don't leak error details
    //1) Log error
    console.error('ERROR 🎆', err);

    //2) Send generic message
    res.status(500).json({
      status: 'error',
      message: errorSomeThingWrong,
    });
  }
};

const handleDuplicateMessage = (err: ErrorMongo) => {
  //RegEx: Grabbing values between quotation marks
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = errorDuplicate(value);
  return new AppErrorHandling(message, 400);
};

const handleCastErrorDB = (err: ErrorCastError) => {
  const message = errorCastMongoose(err);
  return new AppErrorHandling(message, 400);
};

const handleValidationErrorDB = (err: ErrorValidator) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = errorValidation(errors);
  return new AppErrorHandling(message, 400);
};

const handleJWTError = () => new AppErrorHandling(errorInvalidToken, 401);

const handleJWTExpiredError = () => new AppErrorHandling(errorTokenExpired, 401);

export const ErrorController = (err: AppErrorHandling, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  } else {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error as ErrorCastError);
    }

    if ((error as ErrorMongo).code === 11000) {
      error = handleDuplicateMessage(error as ErrorMongo);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error as ErrorValidator);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }

    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    return sendErrorProd(error, res);
  }
};
