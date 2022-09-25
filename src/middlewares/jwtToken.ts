import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Request, NextFunction, Response } from 'express';
import 'express-async-errors';

const JWT_SECRET = 'secret';

const errorToken = [
  {
    statusCode: 401,
    message: 'Token not found',
  },
  {
    statusCode: 401,
    message: 'Invalid token',
  },
];

export interface IReq extends Request {
  user?: JwtPayload | string;
}

const veryfyToken = (req: IReq, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) { return next(errorToken[0]); }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    if (!decoded) { next(errorToken[1]); }
    next();
  } catch (error) {
    next(errorToken[1]);
  }
};

const generateToken = (req: Request) => {
  const jwtConfig: SignOptions = { 
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: req.body }, JWT_SECRET, jwtConfig);
  return token;
};

export default {
  veryfyToken,
  generateToken,
};
