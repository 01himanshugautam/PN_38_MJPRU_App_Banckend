import { Users } from '@models/user.model';
import { LoginDto } from './../dtos/login.dto';
import { mapper } from './mapper';
import { LoginResponse } from '@https/api/v1/auth/responses/login.response';
import { UserResponse } from '@https/api/v1/auth/responses/user.response';

mapper.createMap(LoginDto, LoginResponse);
mapper.createMap(Users, UserResponse);
