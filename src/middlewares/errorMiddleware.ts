import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

export class Error {
  statusCode: number;

  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500);
  res.json({ message: err.message });
  res.end();
};
export default errorMiddleware;
