import CustomSelect from '@/components/custom-select';
import PageDashboardHeader from '@/components/dashboard/header';
import { getTranslations } from 'next-intl/server';

async function LanguageSection() {
  const t = await getTranslations('settingsPage');
  return (
    <>
      <PageDashboardHeader title={t('systemSettings.title')} titleClassName='font-semibold text-lg' description={t('systemSettings.description')} />
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>{t('language.label')}</h4>
        <CustomSelect
          className='w-full max-w-130'
          value='ar'
          options={[
            {value: 'ar', label: 'العربية'},
            {value: 'en', label: 'english'}
          ]}
          placeHolder={t('language.placeholder')}
        />
      </div>
    </>
  );
}

export default LanguageSection;
