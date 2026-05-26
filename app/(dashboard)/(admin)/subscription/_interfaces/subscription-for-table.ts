import { TSubscriptionStatus } from "@/lib/Constant/enum";

export interface ISubscriptionForTable {
  id: string;
  companyName: string;
  companyLocation: string;
  subscriptionType: string;
  price: number;
  status: TSubscriptionStatus;
  startDate: string;
  endDate: string;
}
