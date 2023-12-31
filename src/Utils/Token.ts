import jwt, { JwtPayload } from 'jsonwebtoken';
import pick from 'lodash/pick';
import { expressjwt, IsRevoked } from "express-jwt";
import { Response, CookieOptions } from 'express';

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

const isRevoked: IsRevoked = (req, token) => {
  if (typeof token.payload !== 'string' && token.payload.isAdmin)
    return false
  return true;
}

export const authJwt = () => {
  return expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    isRevoked
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/static\/(.*)/, methods: ['GET', 'OPTIONS'] },
      '/api/v1/users/login',
      '/api/v1/users/register',
    ]
  });
} 
