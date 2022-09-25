import connection from '../models/connection';
import UserModel from '../models/modelsUser';

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

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(
    user: User,
  ) : Promise<User> {
    const newUser = await this.model.create(user);
    return newUser;
  }

  public async login(
    login: Login,
  ) : Promise<Login> {
    const newLogin = await this.model.login(login);
    return newLogin;
  }
}

export default UserService;
