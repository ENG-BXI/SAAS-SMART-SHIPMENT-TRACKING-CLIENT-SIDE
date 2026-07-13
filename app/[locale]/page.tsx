import About from '@/components/landing/about';
import {CtaBanner} from '@/components/landing/cta-banner';
import {FaqSection} from '@/components/landing/FAQ-section';
import {Footer} from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import ImageSlider from '@/components/landing/image-slider';
import Services from '@/components/landing/services';
import ExploreSection from '@/components/landing/explore-section';
import WhyChooseUs from '@/components/landing/why-choose-us';
export default function Home() {
  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Hero />
      <About />
      <Services />
      <ExploreSection />
      <WhyChooseUs />
      <ImageSlider />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}
