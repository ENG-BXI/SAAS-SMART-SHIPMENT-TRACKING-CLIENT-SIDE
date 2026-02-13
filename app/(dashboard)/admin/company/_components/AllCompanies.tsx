import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/app/_components/ui/table';
import {Badge} from '@/app/_components/ui/badge';
import CompanyDialog from './CompanyDialog';
import TablePopover from '@/app/_components/TablePopover';
import {Button} from '@/app/_components/ui/button';
import {File} from 'lucide-react';
import {ICompanyForTable} from '../_interfaces/ICompanyForTable';
import {TableEmpty} from '@/app/_components/TableEmpty';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/app/_components/ui/dialog';
import {useState} from 'react';
import DeleteCompanyService from '../_services/deleteCompany';
import {toast} from 'sonner';
interface IAllCompanies {
  companies?: ICompanyForTable[];
}
function AllCompanies({companies}: IAllCompanies) {
  const [open, setOpen] = useState(false);
  const {mutateAsync: deleteCompany} = DeleteCompanyService();
  function DeleteCompany(id: string) {
    deleteCompany(
      {id},
      {
        onSuccess: () => {
          toast.success(`تم حدف الشركة بنجاح`);
        },
        onError: error => {
          toast.error(`فشل في حدف الشركة ${error.message}`);
          console.error('Error In Delete Company \n', error);
        }
      }
    );
    setOpen(false);
  }
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
        {companies && companies.length > 0 ? (
          companies.map((company, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.numberOfClient}</TableCell>
                <TableCell>{company.companyEmail}</TableCell>
                <TableCell>
                  <Badge className={`${company.subscriptionStatus == 'active' ? 'bg-[#ECFDF3] text-[#037847]' : 'bg-[#fcdae0] text-[#364254]'} capitalize`}>
                    {company.subscriptionStatus}
                    <div className={`rounded-full w-1.25 h-1.25 ${company.subscriptionStatus == 'active' ? ' bg-[#037847] ' : 'bg-[#b30000]'}`}></div>
                  </Badge>
                </TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', text: 'عرض الشركة', link: `/admin/company/${index}`},
                      {type: 'dialog', item: <CompanyDialog type='edit' id={company.id} data={{name: company.name, location: company.location, companyEmail: company.companyEmail}} />},
                      {
                        type: 'dialog',
                        item: (
                          <DeleteDialog
                            onclick={() => {
                              DeleteCompany(company.id);
                            }}
                            open={open}
                            setOpen={setOpen}
                            title={`هل انت متاكد من حدف الشركة ${company.name}`}
                            description={`الشركة ${company.name} سيتم حدفها نهائيا`}
                          />
                        )
                      }
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <TableEmpty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
export default AllCompanies;
interface IDeleteDialog {
  title: string;
  description: string;
  onclick: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function DeleteDialog({title, description, onclick, open, setOpen}: IDeleteDialog) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='w-full justify-start text-[15px] text-red-400'>
          <File className='min-w-6 min-h-6' /> حدف الشركة
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
