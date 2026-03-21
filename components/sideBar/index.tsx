'use client';
import {BanknoteIcon, Building2Icon, LogOut, LucideHome, Menu, NotepadText} from 'lucide-react';
import SideBarLogo from './side-bar-logo';
import SidebarItem, {ISidebarItem} from './sidebar-item';
import {useIsMobile} from '@/hooks/use-mobile';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Button} from '../ui/button';
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
function AppSideBar() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild className='absolute right-0 top-0'>
          <Button variant='outline' className='m-2'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent dir='rtl' side='right' className='w-60'>
          <SideBar />
        </SheetContent>
      </Sheet>
    );
  }
  return <SideBar />;
}

export default AppSideBar;
