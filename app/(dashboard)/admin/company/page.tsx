'use client';
import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import {useState} from 'react';
import AllCompanies from './_components/all-companies';
import CustomPagination from '@/components/custom-pagination';
import CompanyDialog from './_components/company-dialog';
import GetAllCompany from './_services/getAllCompany';
import {TableSkelton} from '@/components/table-skelton';
import {toast} from 'sonner';
import useDebounce from '@/lib/debounce';

const Page = () => {
  const [search, setSearch] = useState('');
  const searchAfterDebounce = useDebounce({value: search});
  const [page, setPage] = useState(1);
  const {data, isLoading, isError, error} = GetAllCompany({page, search: searchAfterDebounce});
  if (isError) {
    toast.error('Error In Fetch All Company');
    console.error('Error In Fetch All Company \n', error);
  }
  return (
    <div>
      <PageDashboardHeader
        title='الشركات'
        description='إدارة الشركات المسجلة على النظام وحالة تفعيلها'
        breadcrumbList={[
          {text: 'الرئيسية', path: '#'},
          {text: 'الشركات', path: '#'}
        ]}
      />
      <DashboardSearchAndActionPage
        value={search}
        setValue={setSearch}
        action={
          <div className=' flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <CompanyDialog type='add' />
          </div>
        }
      />
      {isLoading ? <TableSkelton /> : <AllCompanies companies={data?.data} />}
      {!isLoading && !isError && <CustomPagination currentPage={page} setPage={setPage} pageSize={data!.pageSize} totalCount={data!.totalCount} hasPrevious={data!.hasPrevious} hasNext={data!.hasNext} />}
    </div>
  );
};

export default Page;
