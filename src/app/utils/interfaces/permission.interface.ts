import { IModelBase } from './base/model-base.interface';

export interface Permission extends IModelBase {
  id?: number;
  name: string;
  label: string;
  type: string;
}
