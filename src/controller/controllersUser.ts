import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import UserService from '../service/servicesUser';
import jwtToken from '../middlewares/jwtToken';

const errorLogin = [
  {
    statusCode: 401,
    message: 'Username or password invalid',
  },
];

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    await this.userService.create(req.body);
    const token = jwtToken.generateToken(req);
    res.status(201).json({ token });
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userService.login(req.body);
    req.body = user;
    if (!user) {
      return next(errorLogin[0]);
    }
    const token = jwtToken.generateToken(req);
    res.status(200).json({ token });
  };
}

export default UserController;