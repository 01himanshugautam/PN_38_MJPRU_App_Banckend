import { TokenService } from './token.service';
import { USERS_NOT_FOUND } from '@utils/constant/user.constant';
import Container, { Service } from 'typedi';
import { BaseService } from './base/base.service';
import { UserRepository } from '@repositories/user.repository';
import { Users } from '@models/user.model';
import { User } from '@utils/interfaces/user.interface';
import { UserDto } from '@dtos/user.dto';
import { USER_NOT_FOUND } from '@utils/constant/user.constant';
import { AuthDto } from '@dtos/auth.dto';
import AppError from '@utils/class/app-error.utils';
import JWTHelper from '@https/controller/global/utils/class/jwt-helper.utils';
import { Request } from 'express';
const crypto = require('crypto');

@Service()
export class UserService extends BaseService<User, UserDto> {
  userRepository: UserRepository;
  constructor() {
    super(new UserRepository(Users), USER_NOT_FOUND, USERS_NOT_FOUND);
    this.userRepository = new UserRepository(Users);
  }

  async login(authDto: AuthDto) {
    const password = crypto.createHash('sha256').update(authDto.password).digest('hex');
    const user: User = await this.findOne({ email: authDto.email });
    if (user.password != password) {
      throw new AppError(401, 'UnAuthorized', 'Password is wrong!');
    }
    if (!user.is_active) {
      throw new AppError(401, 'UnAuthorized', 'Your account is inactive!');
    }
    const token = JWTHelper.createToken(user.id, []);
    await Container.get(TokenService).create({ token: `tokens:${user.id}:${token}` });
    return { user, token };
  }

  async logout(req: Request, user: User) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new AppError(404, 'Not Found', 'you are not logged in');
    }
    return await Container.get(TokenService).delete({ token: `tokens:${user.id}:${token}` });
  }
}
