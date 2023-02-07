// initializing db
import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_DB_URL || 'mongodb://localhost/test';
export const connect = () => {
  return mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('DB Connected');
    })
    .catch(error => {
      console.log('Error Connecting DB', error);
    });
};
