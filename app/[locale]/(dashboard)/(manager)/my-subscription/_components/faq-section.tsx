import React from 'react';
import {HelpCircle} from 'lucide-react';
import {useTranslations} from 'next-intl';
interface IFaq {
  q: string;
  a: string;
}
export default function FAQSection() {
  const t = useTranslations('subscriptionPage.faq');

  const faqs = t.raw('items') as IFaq[];

  return (
    <div className='bg-gray-50/50 rounded-2xl border border-gray-100 p-6 md:p-8'>
      <div className='flex items-center gap-x-2 mb-6'>
        <HelpCircle className='h-5 w-5 text-custom-primary-color' />
        <h4 className='font-bold text-gray-900 text-lg'>{t('title')}</h4>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {faqs.map((faq, index) => (
          <div key={index} className='space-y-2 bg-white p-5 rounded-xl border border-gray-50 shadow-2xs'>
            <h5 className='font-bold text-sm text-gray-900'>{faq.q}</h5>

            <p className='text-xs text-muted-foreground leading-relaxed'>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
