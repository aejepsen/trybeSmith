import { Pool, ResultSetHeader } from 'mysql2/promise';

import connection from './connection';

interface User {
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface Login {
  username: string;
  password: string;
}

export default class UserModel {
  public connection: Pool;

  constructor(_connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const [dataInsertId] = await this
      .connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [user.username, user.classe, user.level, user.password],
    );
    const { insertId } = dataInsertId;
    const newUser = { id: insertId, ...user };
    return newUser;
  }

  public async login(login: Login): Promise<Login> {
    const [rows] = await this
      .connection
      .execute(
        'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
        [login.username, login.password],
      );
    const [user] = rows as Login[];
    return user;
  }
}