import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import UserDialog from './_components/user-dialog';
import {Suspense} from 'react';
import UserTableAndPagination from './_components/user-table-and-pagination';
import {UserTableSkeleton} from './_components/skeletons';
import UserRealTime from './_components/user-real-time';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  searchParams: Promise<{
    search: string;
    page: string;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const { page, search } = await searchParams;
  const t = await getTranslations('usersPage');
  return (
    <div>
      <UserRealTime />
      <PageDashboardHeader
        title={t('header.title')}
        description={t('header.description')}
        breadcrumbList={[
          {text: t('header.breadcrumb.home'), path: '/'},
          {text: t('header.breadcrumb.users'), path: '/manager/users'}
        ]}
      />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text={t('actions.filter')} type='secondary' icon={<Filter className='' />} />
            <UserDialog type='add' triggerTitle={t('actions.add')} />
          </div>
        }
      />
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTableAndPagination page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default Page;
