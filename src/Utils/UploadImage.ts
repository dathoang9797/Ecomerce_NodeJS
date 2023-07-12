import multer from 'multer';
import { Request } from 'express';
import { AppErrorHandling, MessageLog } from '@Utils';

type CallBack = (error: Error, destination: string | boolean) => void;

const { errorNotRightImage } = MessageLog;

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: CallBack) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppErrorHandling(errorNotRightImage, 400), false);
  }
};

export const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
