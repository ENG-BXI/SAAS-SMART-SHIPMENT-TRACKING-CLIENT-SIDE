import {cn} from '@/lib/utils';
import Link from 'next/link';
import {ReactNode} from 'react';

export interface ISidebarItem {
  icon: ReactNode;
  text: string;
  isSelected?: boolean;
  link?: string;
}
function SidebarItem({item}: {item: ISidebarItem}) {
  const {icon, text, isSelected = false, link} = item;
  const Icon = icon;
  return (
    <Link href={link || '#'} className={cn(`flex items-center gap-x-1`, isSelected ? 'bg-custom-primary-color text-white' : 'bg-transparent', 'py-1 px-2 rounded-lg hover:bg-custom-primary-color hover:text-white cursor-pointer')}>
      {Icon}
      <h4 className='text-md!'>{text}</h4>
    </Link>
  );
}

export default SidebarItem;
