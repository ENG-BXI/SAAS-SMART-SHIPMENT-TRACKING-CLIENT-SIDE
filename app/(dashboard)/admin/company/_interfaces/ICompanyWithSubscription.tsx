import {ICompany} from './ICompany';

export interface ICompanyWithSubscription extends ICompany {
  numberOfClient: string;
  subscriptionStatus: string;
  subscriptionType: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  subscriptionImage: string;
}
