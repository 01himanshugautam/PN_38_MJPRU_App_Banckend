import { IModelBase } from './base/model-base.interface';

export interface PermissionRole extends IModelBase {
  id?: number;
  permission_id: string;
  role_id: string;
}
