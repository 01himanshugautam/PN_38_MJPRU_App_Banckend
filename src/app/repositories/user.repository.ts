import { User } from '@utils/interfaces/user.interface';
import { BaseRepository } from './base/base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor(model: any) {
    super(model);
  }
}
