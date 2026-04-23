export interface ICompanyForTable {
  id: string;
  name: string;
  location: string;
  numberOfClient: string;
  companyEmail: string;
  subscriptionStatus: 'active' | 'inactive';
}
