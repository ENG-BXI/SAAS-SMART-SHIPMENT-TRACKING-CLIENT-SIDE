import { TSubscriptionStatus } from "@/lib/Constant/enum";

export interface ICompanyForTable {
  id: string;
  name: string;
  location: string;
  numberOfClient: number;
  companyEmail: string;
  subscriptionType: string;
  subscriptionStatus: TSubscriptionStatus;
}
