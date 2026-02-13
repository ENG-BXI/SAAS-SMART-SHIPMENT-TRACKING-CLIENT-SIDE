'use client';
import CustomButton from '@/app/_components/CustomButton';
import DashboardSearchAndActionPage from '@/app/_components/dashboard/DashboardSearchAndActionPage';
import PageDashboardHeader from '@/app/_components/dashboard/header';
import {Filter} from 'lucide-react';
import { useState} from 'react';
import AllCompanies from './_components/AllCompanies';
import CustomPagination from '@/app/_components/CustomPagination';
import CompanyDialog from './_components/CompanyDialog';
import GetAllCompany from './_services/getAllCompany';
import {TableSkelton} from '@/app/_components/TableSkelton';
import {toast} from 'sonner';
import useDebounce from '@/app/_utils/debounce';

const Page = () => {
  const [search, setSearch] = useState('');
  const  searchAfterDebounce = useDebounce({value:search})
  const [page, setPage] = useState(1);
  const {data, isLoading, isError, error} = GetAllCompany({page, search:searchAfterDebounce});
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
