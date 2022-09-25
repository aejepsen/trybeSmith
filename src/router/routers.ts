import { Router } from 'express';
import 'express-async-errors';
import { validationProduct, 
  validationTypeoff,
  validationLength,
  validationTypeOffOrder,
  validationLengthProductsId,
  validationProductsId,
} from '../middlewares/validateProduct';

import { 
  validateLogin,
  validationUser,
  validationTypeoffUser,
  validationLengthUser,
} from '../middlewares/validateUser';

import veryfyToken from '../middlewares/jwtToken';

import UserController from '../controller/controllersUser';

import ProductController from '../controller/controllersProduct';

const router = Router();
const productController = new ProductController();
const userController = new UserController();

router.post(
  '/products', 
  validationProduct,
  validationTypeoff,
  validationLength,
  productController.create,
);
router.get(
  '/products', 
  productController.getAll,
);
router.post(
  '/users',
  validationUser, 
  validationTypeoffUser, 
  validationLengthUser, 
  userController.create,
);
router.get('/orders');
router.post(
  '/login',  
  validateLogin,
  userController.login,
);
router.get(
  '/orders',
  productController.getAllOrders,
);
router.post(
  '/orders',
  veryfyToken.veryfyToken,
  validationProductsId,
  validationLengthProductsId,
  validationTypeOffOrder,
  productController.createOrder,
);

export default router;
