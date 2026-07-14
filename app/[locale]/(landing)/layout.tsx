import {Footer} from '@/components/landing/footer';
import Header from '@/components/landing/header';
import {ReactNode} from 'react';

const LandingLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='min-h-screen overflow-x-hidden'>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default LandingLayout;
