import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import UserDialog from './_components/user-dialog';
import {Suspense} from 'react';
import UserTableAndPagination from './_components/user-table-and-pagination';

interface PageProps {
  searchParams: Promise<{
    search: string;
    page: string;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const {page, search} = await searchParams;
  return (
    <div>
      <PageDashboardHeader title='المستخدمين' description='عرض وإدارة المستخدمين المسجلين على النظام، مع تحديد أدوارهم وصلاحياتهم المرتبطة بإدارة الشحنات والبيانات.' breadcrumbList={[{text: 'المستخدمين', path: '/manager/users'}]} />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <UserDialog type='add' triggerTitle='اضافة مستخدم جديد' />
          </div>
        }
      />
      <Suspense fallback={<h2>Loading ....</h2>}>
        <UserTableAndPagination page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default Page;
