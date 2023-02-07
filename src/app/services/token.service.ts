import { Service } from 'typedi';
import MongoBaseService from './base/mongo-base.service';
import TokenModel from '@models/token.model';
import { TokenDto } from '@dtos/token.dto';

@Service()
export class TokenService extends MongoBaseService<TokenDto> {
  constructor() {
    super(TokenModel);
  }
}
