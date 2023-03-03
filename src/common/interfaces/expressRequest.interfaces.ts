import { Request } from 'express';
import { IUserData } from './userData.interfaces';

export interface ExpressRequestInterface extends Request {
  user?: IUserData;
}
