import About from '@/components/landing/about';
import { CtaBanner } from '@/components/landing/cta-banner';
import { FaqSection } from '@/components/landing/FAQ-section';
import { Footer } from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import ImageSlider from '@/components/landing/image-slider';
import RegisterCompanyForm from '@/components/landing/register-company-form';
import Services from '@/components/landing/services';
import TrackSection from '@/components/landing/track-section';
import WhyChooseUs from '@/components/landing/why-choose-us';
import {useTranslations} from 'next-intl';
export default function Home() {
  const t = useTranslations('homePage');

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Hero />
      <About />
      <Services />
      <TrackSection />
      <WhyChooseUs />
      <ImageSlider />
      <FaqSection badge='FAQ' title='Everything You Should Know About Cargo Logistics' />
      <div className='mx-auto max-w-xl space-y-2 text-center'>
        <h1 className='text-2xl font-semibold text-slate-950'>{t('registerCompany.title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('registerCompany.description')}</p>
      </div>
      <RegisterCompanyForm />
      <CtaBanner title='Ready to ship your cargo Worldwide?' buttonText='Book Shipment' />
      <Footer />
    </div>
  );
}
