import {BanknoteIcon, Building2Icon, LogOut, LucideHome, NotepadText} from 'lucide-react';
import SideBarLogo from './SideBarLogo';
import SidebarItem, { ISidebarItem } from './SidebarItem';
const listOfSideBarItem: ISidebarItem[] = [
  {text: 'الرئيسية', icon: <LucideHome />},
  {text: 'الشركات', icon: <Building2Icon />, isSelected: true},
  {text: 'الاشتراكات', icon: <BanknoteIcon />},
  {text: 'الملاحظات', icon: <NotepadText />},
  {text: 'تسجيل الخروج', icon: <LogOut />}
];
const SideBar = () => {
  return (
    <aside className='w-60 bg-[#F9F9F9] py-8 px-4'>
      <SideBarLogo />
      <div className='flex flex-col gap-y-1.5'>
        {listOfSideBarItem.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;

