import React from 'react';
import {LucideIcon} from 'lucide-react';
import {Check} from 'lucide-react';
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
    title: 'Experienced Logistics',
    description: 'Our specialists bring decades of experience in freight forwarding and customs clearance, ensuring smooth and efficient supply chain solutions worldwide.'
  },
  {
    title: 'Fast Delivery Commitment',
    description: 'We understand the urgency of every shipment and act quickly. Optimized routes and tracking technology ensure timely deliveries without unnecessary delays.'
  },
  {
    title: 'Transparent Pricing Policy',
    description: 'Our pricing is clear, competitive, and easy to understand for all clients. We guarantee no hidden charges and complete financial transparency every time.'
  },
  {
    title: 'Reliable Cargo Handling',
    description: 'Every shipment is managed with precision and care to avoid risks. From packing to loading, we guarantee your cargo arrives safely and intact.'
  },
  {
    title: 'Comprehensive Solutions',
    description: 'We cover every step of logistics including warehousing, distribution, and freight. Our integrated services make supply chain management simple and efficient.'
  },
  {
    title: 'Satisfaction Guarantee',
    description: 'Your trust is our highest priority across all shipments. We back our services with responsive support and a strong customer satisfaction guarantee.'
  }
];
function FeatureCard({title, description, className}: FeatureCardProps) {
  return (
    <div className={cn('flex gap-6', className)}>
      <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-black text-white'>
        <Check className='h-10 w-10 stroke-[3]' />
      </div>

      <div className='space-y-3'>
        <h3 className='text-2xl font-semibold tracking-tight'>{title}</h3>

        <p className='max-w-sm text-base leading-8 text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
}
const WhyChooseUs = () => {
  return (
    <section className='flex container mx-auto flex-col items-center my-20'>
      <h6 className='text-custom-primary-color text-xl mb-2'>Our Services</h6>
      <h2 className='section__title'>Trusted Logistics Partner for Worldwide Shipping</h2>
      <div className='grid gap-x-16 gap-y-14 lg:grid-cols-3 mt-10'>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
