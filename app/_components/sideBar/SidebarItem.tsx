import {ReactNode} from 'react';

export interface ISidebarItem {
  icon: ReactNode;
  text: string;
  isSelected?: boolean;
}
function SidebarItem({item}: {item: ISidebarItem}) {
  const {icon, text, isSelected = false} = item;
  const Icon = icon;
  return (
    <div className={`flex items-center gap-x-1 ${isSelected ? 'bg-custom-primary-color' : 'bg-transparent'} ${isSelected ? 'text-white' : ''} py-1 px-2 rounded-lg hover:bg-custom-primary-color hover:text-white cursor-pointer`}>
      {Icon}
      <h4 className='text-md!'>{text}</h4>
    </div>
  );
}

export default SidebarItem;
