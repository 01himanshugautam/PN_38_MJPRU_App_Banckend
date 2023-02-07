import { IModelBase } from './base/model-base.interface';

export interface User extends IModelBase {
  id?: number;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
}
