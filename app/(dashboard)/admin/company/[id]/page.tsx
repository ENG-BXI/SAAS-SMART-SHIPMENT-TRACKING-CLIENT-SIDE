import PageDashboardHeader from '@/app/_components/dashboard/header';
import CustomButton from '@/app/_components/CustomButton';
import {StopCircle} from 'lucide-react';
import {ICompanyWithSubscription} from '../_interfaces/ICompanyWithSubscription';
import CompanyForm from '../_components/CompanyForm';

const Page = async (params: Promise<{id: string}>) => {
  const {id} = await params;
  console.log(id);
  const company: ICompanyWithSubscription = {
    name: 'شركة الامتياز الاول',
    location: 'الرياض، السعودية',
    numberOfClient: '245',
    companyEmail: 'info@fasttrack.sa',
    subscriptionStatus: 'active',
    subscriptionType: 'basic',
    subscriptionStartDate: '2022-01-01',
    subscriptionEndDate: '2022-12-31',
    subscriptionImage: 'https://via.placeholder.com/150'
  };
  return (
    <div>
      <PageDashboardHeader
        title={`تفاصيل ${company.name}`}
        description={`تفاصيل ${company.name}`}
        breadcrumbList={[
          {text: 'الرئيسية', path: '/admin'},
          {text: 'الشركات', path: '/admin/company'},
          {text: `تفاصيل ${company.name}`, path: '#'}
        ]}
        hasAction
        actions={<CustomButton text='توقيف اشتراك الشركة' type='danger' icon={<StopCircle className='' />} />}
      />
      <CompanyForm company={company} />
    </div>
  );
};

export default Page;
