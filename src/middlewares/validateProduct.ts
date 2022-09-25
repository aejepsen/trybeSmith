import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const errorController = [
  // 0
  {
    statusCode: 400,
    message: '"name" is required',
  },
  // 1
  {
    statusCode: 400,
    message: '"amount" is required',
  },
  // 2
  {
    statusCode: 422,
    message: '"name" must be a string',
  },
  // 3
  {
    statusCode: 422,
    message: '"amount" must be a string',
  },
  // 4
  {
    statusCode: 422,
    message: '"name" length must be at least 3 characters long',
  },
  // 5
  {
    statusCode: 422,
    message: '"amount" length must be at least 3 characters long',
  },
  // 6
  {
    statusCode: 400,
    message: '"productsIds" is required',
  },
  // 7
  {
    statusCode: 422,
    message: '"productsIds" must include only numbers',
  },
  // 8
  {
    statusCode: 422,
    message: '"productsIds" must be an array',
  },
];

function validationProduct(req: Request, _res: Response, next: NextFunction) {
  const { name, amount } = req.body;
  if (!name) { return next(errorController[0]); }
  if (!amount) { return next(errorController[1]); }
  next();
}

function validationTypeoff(req: Request, _res: Response, next: NextFunction) {
  const { name, amount } = req.body;
  if (typeof name !== 'string') { return next(errorController[2]); }
  if (typeof amount !== 'string') { return next(errorController[3]); }
  next();
}

const validationLength = async (req: Request, _res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  if (name.length < 3) { return next(errorController[4]); }
  if (amount.length < 3) { return next(errorController[5]); }
  next();
};

const validationProductsId = async (req: Request, _res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  if (!productsIds) { return next(errorController[6]); }
  next();
};

const validationLengthProductsId = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { productsIds } = req.body;
  if (productsIds.length === 0) { return next(errorController[7]); }
  next();
};

const validationTypeOffOrder = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { productsIds } = req.body;
  if (!Array.isArray(productsIds)) { return next(errorController[8]); }
  next();
};

export {
  validationLengthProductsId,
  validationTypeOffOrder,
  validationProductsId,
  validationProduct,
  validationTypeoff,
  validationLength,
};
