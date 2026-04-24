import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import CompanyDialog from './company-dialog';
import TablePopover from '@/components/table-popover';
import {ICompanyForTable} from '../_interfaces/company-for-table';
import {TableEmpty} from '@/components/table-empty';
import {useState} from 'react';
import DeleteCompanyService from '../_services/deleteCompany';
import {toast} from 'sonner';
import DeleteDialog from '@/components/dashboard/delete-dialog';
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
                            title={`هل انت متاكد من حدف الشركة ${company.name}`}
                            triggerText={`حدف الشركة`}
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
