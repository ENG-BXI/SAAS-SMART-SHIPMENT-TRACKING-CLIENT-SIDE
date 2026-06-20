import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import AllCompanies from './_components/all-companies';
import CustomPagination from '@/components/custom-pagination';
import CompanyDialog from './_components/company-dialog';
import GetAllCompany from './_services/getAllCompany';
import {TableSkelton} from '@/components/table-skelton';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
import CompanyRealTime from './_components/company-real-time';
interface PageProps {
  searchParams: Promise<{
    search: string;
    page: number;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const sp = await searchParams;
  const page = sp?.page || 1;
  const search = sp?.search || '';

  return (
    <div>
      <CompanyRealTime />
      <PageDashboardHeader
        title='الشركات'
        description='إدارة الشركات المسجلة على النظام وحالة تفعيلها'
        breadcrumbList={[
          {text: 'الرئيسية', path: '#'},
          {text: 'الشركات', path: '#'}
        ]}
      />
      <DashboardSearchAndActionPage
        action={
          <div className=' flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <CompanyDialog type='add' />
          </div>
        }
      />
      <Suspense fallback={<TableSkelton />}>
        <PaginatedCompanies page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default Page;

async function PaginatedCompanies({page, search}: {page: number; search: string}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const data = await GetAllCompany({token, page, search});
  return (
    <>
      <AllCompanies companies={data.data} />
      <CustomPagination currentPage={page} pageSize={data.pageSize} totalCount={data.totalCount} hasPrevious={data.hasPrevious} hasNext={data.hasNext} totalPages={data.totalPages} />
    </>
  );
}
