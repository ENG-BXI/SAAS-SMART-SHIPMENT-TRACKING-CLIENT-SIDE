import PageDashboardHeader from '@/components/dashboard/header';
import GetSubscriptionInfo from '../my-subscription/_services/get-subscription-info';
import {UserInfo} from './_components/user-info';
import {LanguageSettings} from './_components/language-settings';
import {cookies} from 'next/headers';
import {SubscriptionSection} from './_components/subscription-section';

const Page = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const subscriptionInfo = await GetSubscriptionInfo(token);
  const start = new Date(subscriptionInfo.startDate);
  const end = new Date(subscriptionInfo.endDate);
  const today = new Date();
  // To Calculate How long time Reminder For your Subscription
  const totalDays = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(0, Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const remainingDays = Math.max(0, totalDays - elapsedDays);

  return (
    <div>
      <PageDashboardHeader title='الاعدادات' description='إدارة إعدادات الحساب، بما يشمل تغيير اللغة، تحديث البيانات الأساسية، ومراجعة معلومات الاشتراك المرتبطة بالنظام.' breadcrumbList={[{text: 'الاعدادات', path: '/manager/settings'}]} />
      <div className='p-3 w-200'>
        <PageDashboardHeader title='اعدادات النظام' titleClassName='font-semibold text-lg' description='اختيار لغة واجهة النظام حسب تفضيلك. سيتم تطبيق التغيير على جميع صفحات النظام.' />
        <LanguageSettings />
        <PageDashboardHeader title='اعدادات الحساب الشخصي' titleClassName='font-semibold text-lg' description='تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.' />
        <UserInfo />
        {/* Subscription */}
        <PageDashboardHeader title='حالة الاشتراك' titleClassName='font-semibold text-lg' description='عرض معلومات الاشتراك الحالية وحدود الاستخدام المرتبطة بالخطة.' />

        <SubscriptionSection status={subscriptionInfo.status} startDate={subscriptionInfo.startDate} endDate={subscriptionInfo.endDate} remainingDays={remainingDays} />
      </div>
    </div>
  );
};

export default Page;
