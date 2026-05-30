import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import CompanyDialog from './company-dialog';
import TablePopover from '@/components/table-popover';
import {ICompanyForTable} from '../_interfaces/company-for-table';
import {TableEmpty} from '@/components/table-empty';
import DeleteCompanyDialog from './delete-company-dialog';
interface IAllCompanies {
  companies?: ICompanyForTable[];
}
function AllCompanies({companies}: IAllCompanies) {
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
                      {type: 'link', text: 'عرض الشركة', link: `/company/${company.id}`},
                      // TODO : Add Subscription Type
                      {type: 'dialog', item: <CompanyDialog type='edit' id={company.id} data={{name: company.name, location: company.location, companyEmail: company.companyEmail, subscriptionType: company?.subscriptionType}} />},
                      {
                        type: 'dialog',
                        item: <DeleteCompanyDialog companyId={company.id} companyName={company.name} />
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
