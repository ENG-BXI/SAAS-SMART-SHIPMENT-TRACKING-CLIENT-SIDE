// import About from '@/components/landing/about';
// import Hero from '@/components/landing/hero';
import RegisterCompanyForm from '@/components/landing/register-company-form';
// import Services from '@/components/landing/services';
// import TrackSection from '@/components/landing/track-section';
import {useTranslations} from 'next-intl';
export default function Home() {
  const t = useTranslations('homePage');

  return (
    <div className='m-3 min-h-screen overflow-x-hidden'>
      <div className='mx-auto mt-4 max-w-xl space-y-2 text-center'>
        <h1 className='text-2xl font-semibold text-slate-950'>{t('registerCompany.title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('registerCompany.description')}</p>
      </div>
      {/* <Hero />
      <About />
      <Services />
      <TrackSection />
      <WhyChooseUs /> */}
      <RegisterCompanyForm />
    </div>
  );
}
