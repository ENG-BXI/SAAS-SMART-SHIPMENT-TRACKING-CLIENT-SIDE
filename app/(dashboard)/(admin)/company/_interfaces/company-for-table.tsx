export interface ICompanyForTable {
  id: string;
  name: string;
  location: string;
  numberOfClient: number;
  companyEmail: string;
  subscriptionStatus: 'active' | 'inactive';
}
