import {UserRoleForSaasAdmin} from '@/lib/Constant/user-role';

export interface IUser {
  id: string;
  email: string;
  companyId: string;
  role: UserRoleForSaasAdmin;
}
