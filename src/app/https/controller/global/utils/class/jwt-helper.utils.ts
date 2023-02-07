import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import AppError from '@https/controller/global/utils/app-error.util';
import crypto from 'crypto';
import Container from 'typedi';
// import { ClientService } from '@services/client.service';
// import { Client } from '@utils/interfaces/client.interface';

export default class JWTHelper {
  public static async compareHash(hash: string, password: string) {
    const validatePassword = await bcrypt.compare(password, hash);
    if (!validatePassword) {
      throw new AppError(401, 'Password Not found', 'User Password not matched');
    }
  }

  public static createToken(sub: any, user_role: string[]) {
    return sign(
      {
        sub,
        user_role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  public static async createHash(stringPassword: string) {
    const saltRounds = 10;
    return await hash(stringPassword, saltRounds);
  }

  public static async verifyToken(token: string) {
    // const hash = crypto.createHash('sha256').update(token).digest('hex');
    // const client: Client = await Container.get(ClientService).findOne({ hash, status: true }, 'ipLists', false);
    // if (!client) {
    //   throw new AppError(401, 'Unauthorized', 'Invalid token');
    // }
    // return client;
  }
}
