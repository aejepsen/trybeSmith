import { Pool, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';

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

export default class ProductModel {
  public connection: Pool;
  
  constructor(_connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const [dataInsertId] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [product.name, product.amount],
    );
    const { insertId } = dataInsertId;
    const newProduct = { id: insertId, ...product };
    return newProduct;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.connection.execute('SELECT * FROM Trybesmith.Products');
    const [rows] = products;
    return rows as Product[];
  }

  public async getAllOrders(): Promise<Orders[]> {
    const query = `SELECT distinct(O.id), O.userId, JSON_ARRAYAGG(P.id) as productsIds
    FROM Trybesmith.Orders as O
    INNER JOIN Trybesmith.Products as P
    ON O.id = P.orderId
    GROUP BY O.id
    ORDER BY O.userId`;
    const allOrders = await this.connection.execute(query);
    const [rows] = allOrders;
    return rows as Orders[];
  }

  public async createOrder(newOrder: NewOrders, id: number): Promise<NewOrders> {
    console.log('productsIds', newOrder.productsIds);
    console.log('id', id);
    const [{ insertId }] = await this
      .connection
      .execute<ResultSetHeader>('INSERT INTO Trybesmith.Orders (userId) VALUES (?)', [id]);
    console.log('insertId', insertId);
    await Promise
      .all(newOrder.productsIds.map((prodId: number) => this.connection
        .execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [insertId, prodId],
      )));
    const newOrders = { userId: id, ...newOrder };
    console.log('newOrder', newOrder);
    return newOrders;
  }
}