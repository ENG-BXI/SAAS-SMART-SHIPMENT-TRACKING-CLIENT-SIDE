import React from 'react';
import {Check, LucideIcon} from 'lucide-react';

import {cn} from '@/lib/utils';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface FeatureCardProps extends FeatureItem {
  className?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    title: 'تتبع الشحنات لحظة بلحظة',
    description: 'تابع مسار كل شحنة بشكل مباشر، واعرف حالتها الحالية منذ إنشائها وحتى تسليمها للعميل.'
  },
  {
    title: 'إدارة الفروع والمستودعات',
    description: 'نظم عمليات جميع الفروع والمستودعات من لوحة تحكم واحدة مع متابعة حركة الشحنات بينها.'
  },
  {
    title: 'إدارة السائقين والمركبات',
    description: 'خصص الشحنات للسائقين، وتابع الرحلات، وأدر أسطول النقل بكفاءة وسهولة.'
  },
  {
    title: 'إدارة المسارات ونقاط التسليم',
    description: 'أنشئ مسارات الرحلات وحدد نقاط التسليم والاستلام لضمان وصول الشحنات بأفضل مسار ممكن.'
  },
  {
    title: 'إشعارات وتحديثات فورية',
    description: 'أرسل تحديثات تلقائية للعملاء والموظفين عند تغير حالة الشحنة أو بدء الرحلة أو اكتمال التسليم.'
  },
  {
    title: 'تقارير تشغيلية وإحصائيات',
    description: 'استعرض أداء الشركة، عدد الشحنات، الإيرادات، الرحلات، ونسب الإنجاز من خلال تقارير ورسوم بيانية.'
  }
];

function FeatureCard({title, description, className}: FeatureCardProps) {
  return (
    <div className={cn('group rounded-3xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-custom-primary-color/30 hover:shadow-xl', className)}>
      <div className='flex gap-5'>
        <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-custom-primary-color/10 text-custom-primary-color transition-all duration-300 group-hover:bg-custom-primary-color group-hover:text-white'>
          <Check className='h-8 w-8 stroke-[2.5]' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-bold transition-colors duration-300 group-hover:text-custom-primary-color'>{title}</h3>

          <p className='text-sm leading-7 text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  );
}

const WhyChooseUs = () => {
  return (
    <section id='why-choose-us' className='container mx-auto my-24 px-4'>
      <div className='mx-auto max-w-3xl text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.25em] text-custom-primary-color'>لماذا تختار نظامنا؟</span>

        <h2 className='mt-4 text-4xl font-bold leading-tight lg:text-5xl'>منصة سحابية متكاملة لإدارة شركات الشحن والخدمات اللوجستية</h2>

        <p className='mt-6 text-lg leading-8 text-muted-foreground'>صُمم نظامنا لمساعدة شركات الشحن على إدارة عملياتها اليومية بكفاءة، بدءًا من إدارة الشحنات والعملاء والسائقين، وصولًا إلى التقارير والمحاسبة، كل ذلك من خلال منصة واحدة سهلة الاستخدام وآمنة.</p>
      </div>

      <div className='mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
