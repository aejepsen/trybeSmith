import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const errorController = [
  {
    statusCode: 400,
    message: '"username" is required',
  },
  {
    statusCode: 400,
    message: '"classe" is required',
  },
  {
    statusCode: 400,
    message: '"level" is required',
  },
  {
    statusCode: 400,
    message: '"password" is required',
  },
  {
    statusCode: 422,
    message: '"username" must be a string',
  },
  {
    statusCode: 422,
    message: '"classe" must be a string',
  },
  {
    statusCode: 422,
    message: '"level" must be a number',
  },
  {
    statusCode: 422,
    message: '"password" must be a string',
  },
  {
    statusCode: 422,
    message: '"username" length must be at least 3 characters long',
  },
  {
    statusCode: 422,
    message: '"classe" length must be at least 3 characters long',
  },
  {
    statusCode: 422,
    message: '"level" must be greater than or equal to 1',
  },
  {
    statusCode: 422,
    message: '"password" length must be at least 8 characters long',
  },
];

function validationUser(req: Request, _res: Response, next: NextFunction) {
  const { username, classe, level, password } = req.body;
  if (!username) { return next(errorController[0]); }
  if (!classe) { return next(errorController[1]); }
  if (level === undefined) { return next(errorController[2]); }
  if (!password) { return next(errorController[3]); }
  next();
}

function validateLogin(req: Request, _res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if (!username) { return next(errorController[0]); }
  if (!password) { return next(errorController[3]); }
  next();
}

function validationTypeoffUser(req: Request, _res: Response, next: NextFunction) {
  const { username, classe, level, password } = req.body;
  if (typeof username !== 'string') { return next(errorController[4]); }
  if (typeof classe !== 'string') { return next(errorController[5]); }
  if (typeof level !== 'number') { return next(errorController[6]); }
  if (typeof password !== 'string') { return next(errorController[7]); }
  next();
}

const validationLengthUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { username, classe, level, password } = req.body;
  if (username.length < 3) { return next(errorController[8]); }
  if (classe.length < 3) { return next(errorController[9]); }
  if (level <= 0) { return next(errorController[10]); }
  if (password.length < 8) { return next(errorController[11]); }
  next();
};

export {
  validateLogin,
  validationUser,
  validationTypeoffUser,
  validationLengthUser,
};
