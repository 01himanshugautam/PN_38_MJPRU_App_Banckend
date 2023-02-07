import mongoose from 'mongoose';

export class TokenDto {
  _id?: mongoose.Types.ObjectId;
  token: string;
}
