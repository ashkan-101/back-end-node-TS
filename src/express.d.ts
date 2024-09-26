import { Request } from 'express';
import IUser from './components/users/model/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}