import CardStat from '@/components/dashboard/card-stat';
import PageDashboardHeader from '@/components/dashboard/header';
import { ChartLineLabel } from './_components/charts';


const page = () => {
  return (
    <div>
      <PageDashboardHeader title='الصفحة الرئيسية' description='نظرة عامة على أداء عمليات الشحن، مع إحصائيات مختصرة عن الشحنات الحالية والمتوقفة، عدد العملاء، وعدد المسارات المسجلة.' breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <div className='flex flex-wrap gap-4 mb-5'>
        <CardStat title='عدد الشركات' value='45' />
        <CardStat title='عدد الزوار' value='45' />
        <CardStat title='عدد الملاحظات' value='45' />
        <CardStat title='الشركات التي شارفت على الانتهاء' value='45' />
        <CardStat title='عدد الشركات المتوقفة' value='45' />
      </div>
      <ChartLineLabel />
    </div>
  );
};

export default page;
