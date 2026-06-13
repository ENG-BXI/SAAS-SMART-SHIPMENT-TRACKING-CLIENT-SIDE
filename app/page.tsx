// import About from '@/components/landing/about';
// import Hero from '@/components/landing/hero';
import RegisterCompanyForm from '@/components/landing/register-company-form';
// import Services from '@/components/landing/services';
// import TrackSection from '@/components/landing/track-section';
import {IconCheck} from '@tabler/icons-react';

export default function Home() {
  return (
    <div className='m-3 min-h-screen overflow-x-hidden'>
      {/* <Hero />
      <About />
      <Services />
      <TrackSection />
      <WhyChooseUs /> */}
      <RegisterCompanyForm />
    </div>
  );
}

interface WhyChooseUsItem {
  title: string;
  description: string;
}
const listOfWhyItems: WhyChooseUsItem[] = [
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

function WhyChooseUs() {
  return (
    <div className='flex flex-col items-center mt-20'>
      <p className='text-custom-primary-color text-xl mb-2'>Why Choose Us</p>
      <h2 className='section__title'>Trusted Logistics Partner for Worldwide Shipping</h2>
      <div dir='ltr' className='flex flex-wrap justify-center gap-x-10 gap-y-20 mt-10'>
        {listOfWhyItems.map(item => (
          <WhyChooseUsItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function WhyChooseUsItem({title, description}: WhyChooseUsItem) {
  return (
    <div className='flex gap-x-6'>
      <div className='bg-black size-20 rounded-2xl flex justify-center items-center'>
        <IconCheck className='text-white size-10' />
      </div>
      <div className='w-75'>
        <h3 className='text-xl mb-3'>{title}</h3>
        <p className='text-muted-foreground text-lg'>{description}</p>
      </div>
    </div>
  );
}
