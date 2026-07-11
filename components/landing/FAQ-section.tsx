'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
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

interface FaqSectionProps {
  badge?: string;
  title: string;

  defaultTab?: string;
}

const cargoFaqData: FaqTab[] = [
  {
    value: 'shipping',
    label: 'Shipping & Delivery',
    items: [
      {id: 'q1', question: 'What services do you offer?', answer: 'We offer comprehensive cargo logistics, ocean freight, air freight, and local warehousing solutions.'},
      {id: 'q2', question: 'How do I get started to get service?', answer: 'You can click on the Book Shipment button below or contact our sales team to set up an account.'},
      {id: 'q3', question: 'Do you handle international shipments?', answer: 'Yes, we clear customs and deliver cargo across more than 150 countries worldwide.'},
      {id: 'q4', question: 'What is included in the shipping process?', answer: 'Our process includes pick-up, secure packaging check, customs clearance, tracking, and final destination delivery.'},
      {id: 'q5', question: 'How long does shipping usually take?', answer: 'Standard sea shipping takes 14-30 days, while air freight typically takes 3-7 business days.'}
    ]
  },
  {
    value: 'tracking',
    label: 'Tracking & Support',
    items: [{id: 't1', question: 'How can I track my shipment in real-time?', answer: 'Use our live tracking portal with your tracking ID sent via email.'}]
  },
  {
    value: 'billing',
    label: 'Billing & Documentation',
    items: [{id: 'b1', question: 'What documents are required for cargo clearance?', answer: "You'll need a commercial invoice, packing list, and bill of lading."}]
  }
];

export const FaqSection: React.FC<FaqSectionProps> = ({badge = 'FAQ', title, defaultTab}) => {
  const fallbackTab = defaultTab || cargoFaqData[0]?.value;

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-16 md:py-24'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>
        {/* الجزء الأيسر: العناوين */}
        <div className='lg:col-span-5 flex flex-col justify-start'>
          <span className='text-custom-primary-color font-bold text-sm uppercase tracking-wider mb-4'>{badge}</span>
          <h2 className='text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-md'>{title}</h2>
        </div>

        {/* الجزء الأيمن: التبويبات والأسئلة */}
        <div className='lg:col-span-7'>
          <Tabs defaultValue={fallbackTab} className='w-full'>
            {/* أشرطة التبويب المخصصة لتطابق التصميم */}
            <TabsList className='w-full justify-start h-auto bg-transparent p-0 border-b border-gray-100 rounded-none flex-wrap gap-2 md:gap-4 mb-8'>
              {cargoFaqData.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:bg-custom-primary-color data-[state=active]:text-white data-[state=inactive]:text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-none font-medium text-sm transition-all shadow-none border-none h-auto'>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* محتوى الأسئلة لكل تبويب */}
            {cargoFaqData.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className='mt-0 focus-visible:outline-none'>
                <Accordion type='single' collapsible className='w-full space-y-2'>
                  {tab.items.map(item => (
                    <AccordionItem key={item.id} value={item.id} className='border-b border-gray-200 py-2'>
                      <AccordionTrigger className='text-left text-slate-800 hover:text-custom-primary-color font-medium text-base md:text-lg hover:no-underline transition-colors py-4'>{item.question}</AccordionTrigger>
                      <AccordionContent className='text-gray-600 text-sm md:text-base leading-relaxed pt-2 pb-4'>{item.answer}</AccordionContent>
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
