import PageDashboardHeader from '@/components/dashboard/header';
import CompanyForm from '../_components/company-form';
import GetCompanyInfo from './_services/get-company-info';
import {cookies} from 'next/headers';
import HeaderActions from './_components/header-actions';
import CompanyDetailsRealTime from './company-real-time';

interface PageProps {
  params: Promise<{id: string}>;
}
const Page = async ({params}: PageProps) => {
  const {id} = await params;
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const companyInfo = await GetCompanyInfo({id, token});
  return (
    <div>
      <CompanyDetailsRealTime id={id} />
      <PageDashboardHeader
        title={`تفاصيل ${companyInfo.name}`}
        description={`تفاصيل ${companyInfo.name}`}
        breadcrumbList={[
          {text: 'الرئيسية', path: '/admin'},
          {text: 'الشركات', path: '/admin/company'},
          {text: `تفاصيل ${companyInfo.name}`, path: '#'}
        ]}
        hasAction
        actions={<HeaderActions id={id} status={companyInfo.subscriptionStatus} />}
      />
      <CompanyForm company={companyInfo} />
    </div>
  );
};

export default Page;
