import PageDashboardHeader from '@/components/dashboard/header';
import CompanyForm from '../_components/company-form';
import GetCompanyInfo from './_services/get-company-info';
import {cookies} from 'next/headers';
import HeaderActions from './_components/header-actions';
import CompanyDetailsRealTime from './company-real-time';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{id: string}>;
}
const Page = async ({params}: PageProps) => {
  const {id} = await params;
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const companyInfo = await GetCompanyInfo({id, token});
  const t = await getTranslations('adminCompanyDetailPage');
  return (
    <div>
      <CompanyDetailsRealTime id={id} />
      <PageDashboardHeader
        title={t('title')}
        description={t('description')}
        breadcrumbList={[
          {text: t('breadcrumb.home'), path: '/statistics'},
          {text: t('breadcrumb.companies'), path: '/company'},
          {text: t('breadcrumb.details'), path: '#'}
        ]}
        hasAction
        actions={<HeaderActions id={id} status={companyInfo.subscriptionStatus} />}
      />
      <CompanyForm company={companyInfo} />
    </div>
  );
};

export default Page;
