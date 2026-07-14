import About from '@/components/landing/about';
import {CtaBanner} from '@/components/landing/cta-banner';
import {FaqSection} from '@/components/landing/FAQ-section';
import Hero from '@/components/landing/hero';
import ImageSlider from '@/components/landing/image-slider';
import Services from '@/components/landing/services';
import ExploreSection from '@/components/landing/explore-section';
import WhyChooseUs from '@/components/landing/why-choose-us';
import DriverAppSection from '@/components/landing/driver-app-section';
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ExploreSection />
      <WhyChooseUs />
      <DriverAppSection />
      <ImageSlider />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
