'use client';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';
import {IconLock} from '@tabler/icons-react';
import {useTranslations} from 'next-intl';
import {ReactNode, useState} from 'react';

export interface ISidebarItem {
  icon: ReactNode;
  text: string;
  isSelected?: boolean;
  link?: string;
  canLock?: boolean;
  isLock?: boolean;
  onClick?: () => void;
}
function SidebarItem({item}: {item: ISidebarItem}) {
  const [prefetch, setPrefetch] = useState(false);
  const {icon, text, isSelected = false, link} = item;
  const textT = useTranslations('sidebar');
  const Icon = icon;
  const isLock = item.canLock && item.isLock;
  const className = cn(`flex text-[15px] items-center gap-x-1`, isSelected ? 'bg-custom-primary-color text-white' : 'bg-transparent', 'py-1.5 px-2 rounded-lg hover:bg-custom-primary-color hover:text-white cursor-pointer', isLock && 'cursor-not-allowed text-gray-400 hover:text-gray-400 hover:bg-transparent');
  return isLock ? (
    <div className={className}>
      {Icon}
      <h4 className=''>{textT(text)}</h4>
      {item.isLock && item.canLock && <IconLock className='ms-auto text-custom-primary-color' size={20} />}
    </div>
  ) : (
    <Link
      href={link || '#'}
      onClick={item.onClick}
      aria-disabled={isLock}
      onMouseEnter={() => {
        if (!isLock) setPrefetch(true);
      }}
      prefetch={prefetch}
      className={className}
    >
      {Icon}
      <h4 className='text-md!'>{textT(text)}</h4>
    </Link>
  );
}

export default SidebarItem;
