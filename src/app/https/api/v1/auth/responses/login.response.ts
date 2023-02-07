import { AutoMap } from '@automapper/classes';
import { LoginDto } from '@dtos/login.dto';
import { BaseMapper } from '@mapper/base/base.mapper';
import { UserResponse } from './user.response';

export class LoginResponse extends BaseMapper<LoginResponse, LoginDto> {
  constructor() {
    super(LoginDto, LoginResponse);
  }

  @AutoMap({ typeFn: () => UserResponse })
  user: UserResponse;

  @AutoMap()
  token: string;
}
