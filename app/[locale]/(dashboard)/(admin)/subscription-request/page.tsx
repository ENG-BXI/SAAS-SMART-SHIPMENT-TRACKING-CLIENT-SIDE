import PageDashboardHeader from '@/components/dashboard/header';
import GetSubscriptionRequests from './_services/get-subscription-requests';
import SubscriptionRequestSummary from './_components/subscription-request-summary';
import SubscriptionRequestCard from './_components/subscription-request-card';
import {cookies} from 'next/headers';
import SubscriptionRequestRealTimeListen from './_components/subscription-request-real-time-listen';

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const data = await GetSubscriptionRequests(token);

  return (
    <div className='w-full pb-10 font-sans' dir='rtl'>
      <SubscriptionRequestRealTimeListen />
      <PageDashboardHeader
        title='طلبات الاشتراك'
        description='طلبات التفعيل وتغيير الباقات الواردة من الشركات بحالة معلقة. راجع الطلبات واتخذ القرار المناسب.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/admin'},
          {text: 'طلبات الاشتراك', path: '/admin/subscription-request'}
        ]}
      />

      <div className='mb-6 border-b border-slate-200 pb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>الطلبات المعلقة</h3>
        <p className='text-sm text-muted-foreground'>يوضح هذا القسم الطلبات الجديدة وتغيرات الباقات التي تحتاج إلى متابعة من الإدارة.</p>
      </div>

      <SubscriptionRequestSummary pendingCompanyCount={data.pendingCompanyCount} changeCompanyCount={data.changeCompanyCount} />

      {data.companies.length > 0 ? (
        <div className='grid gap-4'>
          {data.companies.map(company => (
            <SubscriptionRequestCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className='rounded-3xl border border-dashed border-slate-300 bg-card/80 p-12 text-center text-muted-foreground'>لا توجد طلبات اشتراك معلقة أو طلبات تغيير باقة في الوقت الحالي.</div>
      )}
    </div>
  );
};

export default page;
