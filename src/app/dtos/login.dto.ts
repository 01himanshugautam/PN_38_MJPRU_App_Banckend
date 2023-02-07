import { AutoMap } from '@automapper/classes';
import { Users } from '@models/user.model';

export class LoginDto {
  @AutoMap()
  token?: string;

  @AutoMap({ typeFn: () => Users })
  user?: Users;
}
