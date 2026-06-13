import PageDashboardHeader from '@/components/dashboard/header';
import LanguageSection from './_components/language-section';
import UserSection from './_components/user-section';
import SubscriptionSection from './_components/subscription-section';

const Page = () => {
  return (
    <div>
      <PageDashboardHeader title='الاعدادات' description='إدارة إعدادات الحساب، بما يشمل تغيير اللغة، تحديث البيانات الأساسية، ومراجعة معلومات الاشتراك المرتبطة بالنظام.' breadcrumbList={[{text: 'الاعدادات', path: '/manager/settings'}]} />
      <div className='p-3 w-200'>
        <LanguageSection />
        <PageDashboardHeader title='اعدادات الحساب الشخصي' titleClassName='font-semibold text-lg' description='تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.' />
        <UserSection />
        <PageDashboardHeader title='حالة الاشتراك' titleClassName='font-semibold text-lg' description='عرض معلومات الاشتراك الحالية وحدود الاستخدام المرتبطة بالخطة.' />
        <SubscriptionSection />
      </div>
    </div>
  );
};

export default Page;
