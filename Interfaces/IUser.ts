import { TSubscriptionStatus } from '@/lib/Constant/enum';
import {UserRoleForSaasAdmin} from '@/lib/Constant/user-role';

export interface IUser {
  id: string;
  email: string;
  companyId: string;
  role: UserRoleForSaasAdmin;
  status?: TSubscriptionStatus;
  endSubscriptionDate:string
}
