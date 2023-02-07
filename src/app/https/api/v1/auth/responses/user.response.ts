import { AutoMap } from '@automapper/classes';

import { BaseMapper } from '@mapper/base/base.mapper';
import { Users } from '@models/user.model';

export class UserResponse extends BaseMapper<UserResponse, Users> {
  constructor() {
    super(Users, UserResponse);
  }

  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  is_active: boolean;
}
