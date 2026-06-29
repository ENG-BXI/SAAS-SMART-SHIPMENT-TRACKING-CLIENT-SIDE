'use client';
import CustomSelect, {IOption} from '@/components/custom-select';
import PageDashboardHeader from '@/components/dashboard/header';
import {LocalsNames, routing} from '@/i18n/routing';
import {useLocale, useTranslations} from 'next-intl';

function LanguageSection() {
  const t = useTranslations('settingsPage');
  const locale = useLocale();
  const localOption: IOption[] = routing.locales.map(val => {
    return {label: LocalsNames[val].toUpperCase(), value: val};
  });
  return (
    <>
      <PageDashboardHeader title={t('systemSettings.title')} titleClassName='font-semibold text-lg' description={t('systemSettings.description')} />
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>{t('language.label')}</h4>
        <CustomSelect className='w-full max-w-130' value={locale} options={localOption} placeHolder={t('language.placeholder')} />
      </div>
    </>
  );
}

export default LanguageSection;
