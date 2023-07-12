import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { Response, CookieOptions } from 'express';
// import { IUser } from '@Models/UserModel';

export const signToken = (user: Pick<any, 'user_name' | 'type_login' | '_id'>) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const compareToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createSendToken = (data: any, statusCode: number, res: Response
) => {
  const token = signToken(pick(data, ['user_name', 'type_login', '_id']));
  const cookieOption: CookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);
  data.user_password = undefined;
  return res.status(statusCode).json({ status: 'Success', token, data });
};
