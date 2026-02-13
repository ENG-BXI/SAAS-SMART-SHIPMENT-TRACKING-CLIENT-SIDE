import {File, MoreVertical} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/app/_components/ui/popover';
import {buttonVariants} from '@/app/_components/ui/button';
import {ReactNode} from 'react';
import Link from 'next/link';
type ITablePopoverItem = {type: 'dialog'; item: ReactNode} | {type: 'link'; text: string; link: string};
interface ITablePopover {
  items: ITablePopoverItem[];
}
function TablePopover({items}: ITablePopover) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className='max-w-4 max-h-4' />
      </PopoverTrigger>
      <PopoverContent align='end' dir='rtl' className='w-70'>
        <h4 className='text-[16px] mb-2'>العمليات</h4>
        {/* //TODO: add the id of the company to the link */}
        {items.map((item, index) => {
          if (item.type === 'link') {
            return (
              <Link key={index} href={item.link} className={`${buttonVariants({variant: 'ghost'})} w-full justify-start text-[15px]`}>
                <File className='min-w-6 min-h-6' /> {item.text}
              </Link>
            );
          } else if (item.type === 'dialog') {
            return item.item;
          }
        })}
      </PopoverContent>
    </Popover>
  );
}

export default TablePopover;
