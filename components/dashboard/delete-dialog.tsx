import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {File} from 'lucide-react';
import {memo} from 'react';
interface IDeleteDialog {
  title: string;
  triggerText: string;
  description: string;
  onclick: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function DeleteDialog({title, triggerText, description, onclick, open, setOpen}: IDeleteDialog) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogClose asChild>
            <Button variant={'outline'}>الغاء</Button>
          </DialogClose>
          <Button onClick={() => onclick()} variant={'destructive'}>
            حدف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DeleteDialog) as unknown as typeof DeleteDialog;
