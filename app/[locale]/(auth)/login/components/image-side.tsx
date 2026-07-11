import SideBarLogo from '@/components/sideBar/side-bar-logo';
import Image from 'next/image';

const ImageSide = () => {
  return (
    <div className='hidden xl:flex w-1/2 relative flex-col h-full bg-blue-400'>
      <SideBarLogo className='absolute z-10 top-8 left-8' />
      <Image src={'/assets/login-image.jpg'} alt='login-image' fill />
    </div>
  );
};

export default ImageSide;
