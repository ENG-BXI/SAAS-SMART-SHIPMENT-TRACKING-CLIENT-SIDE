'use client';
import CustomButton from '@/app/_components/CustomButton';
import DashboardSearchAndActionPage from '@/app/_components/dashboard/DashboardSearchAndActionPage';
import PageDashboardHeader from '@/app/_components/dashboard/header';
import {Filter, PlusCircle} from 'lucide-react';
import {useState} from 'react';
import AllCompanies from './_components/AllCompanies';
import {ICompany} from './_types/ICompany';
import CustomPagination from '@/app/_components/CustomPagination';
const companies: ICompany[] = [
  {
    name: 'الخط السريع للشحن',
    location: 'الرياض، السعودية',
    numberOfClient: '245',
    email: 'info@fasttrack.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'صحراء اكسبريس',
    location: 'جدة، السعودية',
    numberOfClient: '187',
    email: 'operations@desertexpress.com',
    subscriptionStatus: 'active'
  },
  {
    name: 'الشحن العربي',
    location: 'الدمام، السعودية',
    numberOfClient: '312',
    email: 'support@arabiancargo.com',
    subscriptionStatus: 'inactive'
  },
  {
    name: 'نقل البحر الأحمر',
    location: 'جدة، السعودية',
    numberOfClient: '156',
    email: 'contact@redseatransport.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'ناقلات طريق الخليج',
    location: 'الخبر، السعودية',
    numberOfClient: '89',
    email: 'admin@gulfroad.com',
    subscriptionStatus: 'inactive'
  },
  {
    name: 'الأسطول الذهبي',
    location: 'الرياض، السعودية',
    numberOfClient: '421',
    email: 'sales@goldenfleet.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'نقل الجزيرة',
    location: 'الرياض، السعودية',
    numberOfClient: '76',
    email: 'info@jaziratrans.com',
    subscriptionStatus: 'inactive'
  },
  {
    name: 'شحن المملكة',
    location: 'الدمام، السعودية',
    numberOfClient: '234',
    email: 'contact@kingdomshipping.com',
    subscriptionStatus: 'active'
  },
  {
    name: 'النقل المتكامل',
    location: 'جدة، السعودية',
    numberOfClient: '198',
    email: 'support@integratedtrans.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'طرق العرب',
    location: 'الرياض، السعودية',
    numberOfClient: '54',
    email: 'info@arabroads.com',
    subscriptionStatus: 'inactive'
  },
  {
    name: 'الشمال للشحن',
    location: 'حائل، السعودية',
    numberOfClient: '67',
    email: 'operations@northcargo.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'الجنوب للنقل',
    location: 'أبها، السعودية',
    numberOfClient: '92',
    email: 'contact@southtransport.com',
    subscriptionStatus: 'active'
  },
  {
    name: 'الشرق للخدمات اللوجستية',
    location: 'الخبر، السعودية',
    numberOfClient: '178',
    email: 'info@eastlogistics.sa',
    subscriptionStatus: 'active'
  },
  {
    name: 'الغرب للشحن',
    location: 'تبوك، السعودية',
    numberOfClient: '45',
    email: 'admin@westcargo.com',
    subscriptionStatus: 'inactive'
  },
  {
    name: 'سيف للنقل',
    location: 'الرياض، السعودية',
    numberOfClient: '123',
    email: 'support@saiftransport.sa',
    subscriptionStatus: 'active'
  }
];
const Page = () => {
  const [search, setSearch] = useState('');
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
            <CustomButton text=' اضافة شركة جديدة' icon={<PlusCircle className='min-w-5 min-h-5' />} />
          </div>
        }
      />
      <AllCompanies companies={companies} />
      <CustomPagination page={1} pageCount={10} totalCount={20} />
    </div>
  );
};

export default Page;
