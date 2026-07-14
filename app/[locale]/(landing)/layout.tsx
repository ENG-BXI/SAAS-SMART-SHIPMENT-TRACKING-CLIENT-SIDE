import {Footer} from '@/components/landing/footer';
import Header from '@/components/landing/header';
import {ReactNode, Suspense} from 'react';

const LandingLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='min-h-screen overflow-x-hidden'>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default LandingLayout;
