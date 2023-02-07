import mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const TokenModel = mongoose.model('tokens', TokenSchema);

export default TokenModel;
