import CardStat from '@/components/dashboard/card-stat';
import PageDashboardHeader from '@/components/dashboard/header';
import {ChartLineLabel} from './_components/charts';
import {GetAdminStatistics} from './_services/get-admin-statistics';

const StatisticsAdminPage = async () => {
  const adminStatistics = await GetAdminStatistics();
  return (
    <div>
      <PageDashboardHeader title='الصفحة الرئيسية' description='نظرة عامة على أداء عمليات الشحن، مع إحصائيات مختصرة عن الشحنات الحالية والمتوقفة، عدد العملاء، وعدد المسارات المسجلة.' breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <div className='flex flex-wrap gap-4 mb-5'>
        <CardStat title='عدد الشركات' value={adminStatistics.numberOfCompanies} />
        {/* // TODO: add numberOfVisited From Backend */}
        <CardStat title='عدد الزوار' value='45' />
        <CardStat title='عدد الملاحظات' value={adminStatistics.numberOfNotes} />
        <CardStat title='الشركات التي شارفت على الانتهاء' value={adminStatistics.numberOfWillSubscriptionFinish} />
        <CardStat title='عدد الشركات المتوقفة' value={adminStatistics.numberOfPausedCompanies} />
      </div>
      <ChartLineLabel chartData={adminStatistics.numberOfCompanyByMonth} />
    </div>
  );
};

export default StatisticsAdminPage;
