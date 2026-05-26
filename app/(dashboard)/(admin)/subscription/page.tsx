import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import CustomPagination from '@/components/custom-pagination';
import { Suspense } from 'react';
import AllSubscriptions from './_components/all-subscriptions';
import { ISubscriptionForTable } from './_interfaces/subscription-for-table';

interface PageProps {
  searchParams: Promise<{
    search: string;
    page: number;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;
  const page = sp?.page || 1;
  const search = sp?.search || '';

  return (
    <div>
      <PageDashboardHeader
        title='الاشتراكات'
        description='إدارة ومتابعة اشتراكات الشركات المسجلة على النظام'
        breadcrumbList={[
          { text: 'الرئيسية', path: '#' },
          { text: 'الاشتراكات', path: '#' },
        ]}
      />
      <DashboardSearchAndActionPage />
      <Suspense fallback={<div className="p-10 text-center">جاري التحميل...</div>}>
        <PaginatedSubscriptions page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default Page;

// Static mock data for subscriptions
const staticData: ISubscriptionForTable[] = [
  {
    id: '1',
    companyName: 'شركة الأمل للتجارة',
    companyLocation: 'الرياض',
    subscriptionType: 'شهري',
    price: 150,
    status: 'active',
    startDate: '2026-01-10T00:00:00Z',
    endDate: '2026-02-10T00:00:00Z',
  },
  {
    id: '2',
    companyName: 'مؤسسة الشحن السريع',
    companyLocation: 'جدة',
    subscriptionType: 'سنوي',
    price: 1500,
    status: 'pending',
    startDate: '2026-05-15T00:00:00Z',
    endDate: '2027-05-15T00:00:00Z',
  },
  {
    id: '3',
    companyName: 'شركة النقل المتقدم',
    companyLocation: 'الدمام',
    subscriptionType: 'شهري',
    price: 150,
    status: 'expired',
    startDate: '2026-03-01T00:00:00Z',
    endDate: '2026-04-01T00:00:00Z',
  },
  {
    id: '4',
    companyName: 'المتحدة للوجستيات',
    companyLocation: 'مكة المكرمة',
    subscriptionType: 'سنوي',
    price: 1500,
    status: 'inactive',
    startDate: '2025-01-01T00:00:00Z',
    endDate: '2026-01-01T00:00:00Z',
  },
];
function PaginatedSubscriptions({ page, search }: { page: number; search: string }) {

  // Simple search filtering
  const filteredData = search
    ? staticData.filter(
        (item) =>
          item.companyName.includes(search) || item.companyLocation.includes(search)
      )
    : staticData;

  const pageSize = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;

  return (
    <>
      <AllSubscriptions subscriptions={filteredData} />
      <CustomPagination
        currentPage={page}
        pageSize={pageSize}
        totalCount={totalCount}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        totalPages={totalPages}
      />
    </>
  );
}
