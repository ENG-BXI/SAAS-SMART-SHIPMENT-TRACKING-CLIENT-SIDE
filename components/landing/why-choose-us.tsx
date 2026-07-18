import React from 'react';
import {Check, LucideIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {cn} from '@/lib/utils';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface FeatureCardProps extends FeatureItem {
  className?: string;
}

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
  const t = useTranslations('landingPage.whyChooseUs');
  const features = t.raw('features') as FeatureItem[];

  return (
    <section id='why-choose-us' className='container mx-auto my-24 px-4'>
      <div className='mx-auto max-w-3xl text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.25em] text-custom-primary-color'>{t('eyebrow')}</span>

        <h2 className='mt-4 text-4xl font-bold leading-tight lg:text-5xl'>{t('title')}</h2>

        <p className='mt-6 text-lg leading-8 text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {features.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
