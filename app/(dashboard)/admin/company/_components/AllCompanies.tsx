import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/app/_components/ui/table';
import {ICompany} from '../_types/ICompany';
import {Badge} from '@/app/_components/ui/badge';
import {ArrowRight, File, Info, MoreVertical, PlusCircle} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/app/_components/ui/popover';
import {Button} from '@/app/_components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/app/_components/ui/dialog';
import CustomInput from '@/app/_components/CustomInput';
import {useState} from 'react';
import CustomButton from '@/app/_components/CustomButton';
interface IAllCompanies {
  companies: ICompany[];
}
function AllCompanies({companies}: IAllCompanies) {
  const [name, setName] = useState('');
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-start'>اسم الشركة</TableHead>
          <TableHead className='text-start'>موقع الشركة</TableHead>
          <TableHead className='text-start'>عدد العملاء</TableHead>
          <TableHead className='text-start'>ايميل الشركة</TableHead>
          <TableHead className='text-start'>حالة الاشتراك</TableHead>
          <TableHead className=''></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>{company.numberOfClient}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>
                <Badge className={`${company.subscriptionStatus == 'active' ? 'bg-[#ECFDF3] text-[#037847]' : 'bg-[#fcdae0] text-[#364254]'} capitalize`}>
                  {company.subscriptionStatus}
                  <div className={`rounded-full w-1.25 h-1.25 ${company.subscriptionStatus == 'active' ? ' bg-[#037847] ' : 'bg-[#b30000]'}`}></div>
                </Badge>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreVertical className='max-w-4 max-h-4' />
                  </PopoverTrigger>
                  <PopoverContent align='end' dir='rtl' className='w-70'>
                    <h4 className='text-[16px] mb-2'>العمليات</h4>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
                          <File className='min-w-6 min-h-6' /> عرض الشركة
                        </Button>
                      </DialogTrigger>
                      <DialogContent dir='rtl'>
                        <DialogHeader>
                          <div className='bg-[#dbecfa] max-w-min p-2 rounded-full text-[#175CD3]'>
                            <Info />
                          </div>
                          <DialogTitle className=''>اضافة شركة جديدة</DialogTitle>
                          <DialogDescription>إنشاء شركة جديدة لتمكينها من استخدام النظام وإدارة عمليات الشحن الخاصة بها.</DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-y-2'>
                          <CustomInput hasLabel label='اسم الشركة' required value={name} setValue={setName} placeHolder='مثال: الخط السريع للشحن' />
                          <CustomInput hasLabel label='موقع الشركة' required value={name} setValue={setName} placeHolder='مثال: الرياض، السعودية' />
                          <CustomInput hasLabel label='ايميل الشركة' required value={name} setValue={setName} placeHolder='مثال: example@gmail.com' />
                          <CustomInput hasLabel label='كلمة السرة' required value={name} setValue={setName} placeHolder='***********' />
                        </div>
                        <DialogFooter>
                          <DialogClose>
                            <CustomButton text='الغاء' icon={<ArrowRight />} type='secondary' className='flex-row-reverse' />
                          </DialogClose>
                          <CustomButton text='اضافة' icon={<PlusCircle />} className='bg-black' />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
                      <File className='min-w-6 min-h-6' /> تعديل الشركة
                    </Button>
                    <Button variant={'ghost'} className='w-full justify-start text-[15px] text-red-400'>
                      <File className='min-w-6 min-h-6' /> حدف الشركة
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default AllCompanies;
