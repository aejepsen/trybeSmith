import { Request, Response } from 'express';
import 'express-async-errors';
import ProductService from '../service/servicesProduct';

interface Product {
  name: string;
  amount: string;
}

interface NewOrders {
  productsIds: number[];
}

interface IReq extends Request {
  user?: {
    data: { 
      id: number,
    };
  }
}

class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const product = req.body as Product;
    const newProduct = await this.productService.create(product);
    res.status(201).json(newProduct);
  };

  public getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };

  public getAllOrders = async (req: Request, res: Response) => {
    const orders = await this.productService.getAllOrders();
    res.status(200).json(orders);
  };

  public createOrder = async (req: IReq, res: Response) => {
    const newOrder = req.body as NewOrders;
    if (!req.user) {
      return res.status(401).json({ message: 'id undefined' });
    }
    const { id } = req.user.data;
    const newOrders = await this.productService.createOrder(newOrder, id);
    return res.status(201).json(newOrders);
  };
}

export default ProductController;
