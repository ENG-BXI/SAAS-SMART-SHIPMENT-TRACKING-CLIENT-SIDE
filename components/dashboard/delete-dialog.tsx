'use client';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {File, Loader2} from 'lucide-react';
import {memo} from 'react';
interface IDeleteDialog {
  title: string;
  triggerText: string;
  description: string;
  onclick: () => void;
  isLoading?: boolean;
}
function DeleteDialog({title, triggerText, description, onclick, isLoading = false}: IDeleteDialog) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='w-full justify-start text-[15px] text-red-400'>
          <File className='min-w-6 min-h-6' /> {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent dir='rtl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isLoading} asChild>
            <Button variant={'outline'}>الغاء</Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={() => onclick()} variant={'destructive'}>
            {isLoading ? (
              <div className='flex items-center gap-x-2'>
                <Loader2 className='animate-spin' /> <span>جاري الحذف...</span>
              </div>
            ) : (
              'حذف'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DeleteDialog) as unknown as typeof DeleteDialog;
