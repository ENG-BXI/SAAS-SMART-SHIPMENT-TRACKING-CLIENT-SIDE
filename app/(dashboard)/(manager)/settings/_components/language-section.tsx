import CustomSelect from "@/components/custom-select";
import PageDashboardHeader from "@/components/dashboard/header";

function LanguageSection() {
  return (
    <>
      <PageDashboardHeader title='اعدادات النظام' titleClassName='font-semibold text-lg' description='اختيار لغة واجهة النظام حسب تفضيلك. سيتم تطبيق التغيير على جميع صفحات النظام.' />
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>لغة النظام</h4>
        <CustomSelect
          className='w-full max-w-130'
          value='ar'
          options={[
            {value: 'ar', label: 'العربية'},
            {value: 'en', label: 'الإنجليزية'}
          ]}
          placeHolder='لغة النظام'
        />
      </div>
    </>
  );
}

export default LanguageSection