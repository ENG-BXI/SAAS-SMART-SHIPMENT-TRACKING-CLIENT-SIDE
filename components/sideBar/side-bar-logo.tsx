import {cn} from '@/lib/utils';
import {Infinity} from 'lucide-react';
interface SideBarLogoProps {
  className?: string;
}
function SideBarLogo({className}: SideBarLogoProps) {
  return (
    <div className={cn('flex ms-2 items-center gap-x-1 mb-5', className)}>
      <div className='bg-custom-primary-color rounded-lg p-0.5'>
        <Infinity className='text-white' />
      </div>
      <span className='text-xl mb-0.5'>3S Tracking</span>
    </div>
  );
}
export default SideBarLogo;
