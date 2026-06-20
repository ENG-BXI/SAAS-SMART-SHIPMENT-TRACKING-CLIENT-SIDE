import PageDashboardHeader from '@/components/dashboard/header';
import {Suspense} from 'react';
import AllSubscriptions from './_components/all-subscriptions';
import GetAllSubscription from '../../../../services/get-all-subscription';
import {cookies} from 'next/headers';
import SubscriptionDialog from './_components/subscription-dialog';

const Page = async () => {
  // TODO : Add Edit Delete Subscription ✅
  // TODO : return Status Of Subscription For View in Company Table ✅
  // TODO : Add Statistics For Number Of Subscription Request For Platform ✅
  // TODO : Connection My-Subscription Page in Manager Role With Backend ✅
  // TODO : Return Id Of Subscription Type in Company Table For Edit Subscription Type in Dialog ✅
  // TODO : Subscription Request Added From Landing page and Come To Admin With Pending Status Of Subscription With Bill Of Payment ✅
  // TODO : Lock Page When Subscription is expire ✅
  // TODO : Show pending Page When Subscription is Pending ✅
  // TODO : Connect Company Details With Backend ✅
  // TODO : Pause and Active Company Subscription ✅
  // TODO : Disable change subscription when Company is Pending ✅
  // TODO : View Alert For Renew Subscription when Subscription in expire ✅
  // TODO : Calculate Number of Visit ✅
  // TODO : Setting ✅
  // TODO : Client Page For Shipment ✅
  // TODO : denied Client and Driver to login in Dashboard because have a mobile app for that ✅
  // TODO : Work in Backend and maintenance Auth and Some logic and add Repository Layer ✅
  // TODO : Connect Setting Page ✅
  // TODO : Fix UI Mistake ✅
  // TODO : Add Number of Shipment item in Shipment details page ✅
  // TODO : Send Email Successful when Accept Subscription ✅
  // TODO : Add Real Time by Socket io
  // TODO : Add Multi Language
  // TODO : Add map in Client shipment Details Page For Way And Point
  // TODO : Landing Page for Company Register
  // TODO : Mobile App For Client And Driver
  // TODO : add poster Project for social media
  return (
    <div>
      <PageDashboardHeader
        title='الاشتراكات'
        description='إدارة ومتابعة باقات الاشتراك'
        breadcrumbList={[
          {text: 'الرئيسية', path: '#'},
          {text: 'الاشتراكات', path: '#'}
        ]}
        hasAction
        actions={<SubscriptionDialog type='add' />}
      />
      <Suspense fallback={<div className='p-10 text-center'>Loading ...</div>}>
        <Subscriptions />
      </Suspense>
    </div>
  );
};

export default Page;

async function Subscriptions() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const subscription = await GetAllSubscription(token);

  return <AllSubscriptions subscriptions={subscription} />;
}
