import connection from '../models/connection';
import ProductModel from '../models/modelsProduct';

interface Product {
  name: string;
  amount: string;
}

interface Orders {
  id: number;
  userId: number;
  productsIds: number[];
}

interface NewOrders {
  productsIds: number[];
}

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: Product): Promise<Product> {
    const newProduct = await this.model.create(product);
    return newProduct;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }
  
  public async getAllOrders(): Promise<Orders[]> {
    const orders = await this.model.getAllOrders();
    return orders;
  }

  public async createOrder(newOrder: NewOrders, id: number): Promise<NewOrders> {
    const newOrders = await this.model.createOrder(newOrder, id);
    return newOrders;
  }
}

export default ProductService;