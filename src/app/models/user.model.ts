import { AutoMap } from '@automapper/classes';
import { Model } from 'objection';
import { User } from '@utils/interfaces/user.interface';

export class Users extends Model implements User {
  @AutoMap()
  id?: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  is_active: boolean;

  static get tableName() {
    return 'users';
  }
}
