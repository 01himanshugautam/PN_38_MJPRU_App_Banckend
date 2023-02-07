// import bcrypt from 'bcryptjs';
// import { sign, verify } from 'jsonwebtoken';
// import { hash } from 'bcryptjs';
// import AppError from './app-error.utils';
// import { RedisCacheManager } from '@caches/redis-manager.cache';

// export default class JWTHelper {
//   public static async compareHash(hash: string, password: string) {
//     const validatePassword = await bcrypt.compare(password, hash);
//     if (!validatePassword) {
//       throw new AppError(401, 'Password Not found', 'User Password not matched');
//     }
//   }

//   public static async saveToken(userId: string, token: string) {
//     await new RedisCacheManager().set(`tokens:${userId}:${token}`, '1', 31536000);
//   }

//   public static createToken(sub: string, user_role: string[]) {
//     return sign(
//       {
//         sub,
//         user_role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//       },
//     );
//   }

//   public static async createHash(stringPassword: string) {
//     const saltRounds = 10;
//     return await hash(stringPassword, saltRounds);
//   }

//   public static verifyToken(token: string) {
//     const decoded_data = verify(token, process.env.JWT_SECRET);
//     if (!decoded_data) {
//       throw new AppError(401, 'UnAuthorised', 'Token is not valid');
//     }
//     return decoded_data;
//   }
// }
