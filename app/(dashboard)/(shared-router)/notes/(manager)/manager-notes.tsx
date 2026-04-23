import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import NoteDialog from './_components/note-dialog';
interface INoteForTable {
  id: string;
  createdDate: string;
  type: string;
  note: string;
}
const listOfNotes: INoteForTable[] = [
  {
    id: '1',
    createdDate: '2026-03-22',
    type: 'شكوى',
    note: 'تم التاخير في تسليم الشحنة'
  },
  {
    id: '2',
    createdDate: '2026-03-22',
    type: 'استفسار',
    note: 'متى سيتم تسليم الشحنة'
  },
  {
    id: '3',
    createdDate: '2026-03-22',
    type: 'شكوى',
    note: 'تم التاخير في تسليم الشحنة'
  }
];
const ManagerNotes = () => {
  return (
    <div>
      <PageDashboardHeader title='الملاحظات' description='يتيح هذا القسم للشركات إرسال ملاحظات، شكاوى، أو طلبات تغيير إلى إدارة النظام. يتم عرض جميع الملاحظات مباشرة في لوحة تحكم الأدمن لمراجعتها واتخاذ الإجراء المناسب.' breadcrumbList={[{text: 'الملاحظات', path: '/manager/notes'}]} />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <NoteDialog type='add' triggerTitle='اضافة ملاحظة جديدة' />
          </div>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>تاريخ الانشاء</TableHead>
            <TableHead className='text-start'>نوع الملاحظة</TableHead>
            <TableHead className='text-start'>الملاحظة</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfNotes?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfNotes?.map(note => (
              <TableRow key={note.id}>
                <TableCell className='w-50'>{note.createdDate}</TableCell>
                <TableCell className='w-60'>{note.type}</TableCell>
                {/* //TODO: add badge here by user role  */}
                <TableCell className=''>{note.note}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <NoteDialog type='edit' triggerTitle='تعديل بيانات الملاحظة' data={{createdDate: note.createdDate, type: note.type, note: note.note}} />}
                      // {
                      //   type: 'dialog',
                      //   item: <DeleteDialog title='حذف الملاحظة' triggerText='حذف الملاحظة' description='هل انت متاكد من حذف الملاحظة' onclick={() => {}} open={open} setOpen={setOpen} />
                      // }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={10} totalCount={100} currentPage={1} hasNext={true} hasPrevious={true} totalPages={10} />
    </div>
  );
};

export default ManagerNotes;
