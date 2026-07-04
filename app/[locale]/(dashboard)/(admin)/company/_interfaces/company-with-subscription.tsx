import {TSubscriptionStatus} from '@/lib/Constant/enum';
import {ICompany} from './company';

export interface ICompanyWithSubscription extends ICompany {
  numberOfClient: number;
  subscriptionStatus: TSubscriptionStatus;
  subscriptionType: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  subscriptionImage: string;
}
