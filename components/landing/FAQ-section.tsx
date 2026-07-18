'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {useTranslations} from 'next-intl';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqTab {
  value: string;
  label: string;
  items: FaqItem[];
}

export const FaqSection = () => {
  const t = useTranslations('landingPage.faq');
  const faqData = t.raw('tabs') as FaqTab[];

  return (
    <section id='faq' className='mx-auto w-full max-w-7xl px-4 py-16 md:py-24'>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-5'>
          <span className='mb-4 block text-sm font-bold uppercase tracking-wider text-custom-primary-color'>{t('eyebrow')}</span>

          <h2 className='max-w-lg text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl'>{t('title')}</h2>

          <p className='mt-6 max-w-md text-base leading-8 text-gray-600'>{t('description')}</p>
        </div>

        <div className='lg:col-span-7'>
          <Tabs defaultValue={faqData[0].value} className='w-full'>
            <TabsList className='mb-10 flex h-auto w-fit flex-wrap gap-2 rounded-full bg-gray-100 p-1'>
              {faqData.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className='rounded-full px-6 py-2.5 text-sm font-medium text-gray-600 transition-all data-[state=active]:bg-custom-primary-color data-[state=active]:text-white'>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqData.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className='mt-0'>
                <Accordion type='single' collapsible className='w-full space-y-3'>
                  {tab.items.map(item => (
                    <AccordionItem key={item.id} value={item.id} className='rounded-xl border border-gray-200 px-5 transition-colors hover:border-custom-primary-color'>
                      <AccordionTrigger className='py-5 text-right text-base font-medium text-slate-800 hover:text-custom-primary-color hover:no-underline md:text-lg'>{item.question}</AccordionTrigger>

                      <AccordionContent className='pb-5 text-sm leading-7 text-gray-600 md:text-base'>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};
