import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import NoteDialog from './_components/note-dialog';
import GetAllNotes from './_services/get-all-notes';
import {cookies} from 'next/headers';
import {Badge} from '@/components/ui/badge';
import {cn, formattedDate} from '@/lib/utils';
import {NOTE_TYPE_NAMES} from '@/lib/Constant/note-type';
import {Suspense} from 'react';
import {NoteTableSkeleton} from '../_components/skeletons';
interface IAdminNotesProps {
  searchParams: {search?: string; page?: string};
}
const AdminNotes = async ({searchParams}: IAdminNotesProps) => {
  return (
    <div>
      <PageDashboardHeader title='الملاحظات' description='يتيح هذا القسم للشركات إرسال ملاحظات، شكاوى، أو طلبات تغيير إلى إدارة النظام. يتم عرض جميع الملاحظات مباشرة في لوحة تحكم الأدمن لمراجعتها واتخاذ الإجراء المناسب.' breadcrumbList={[{text: 'الملاحظات', path: '/manager/notes'}]} />
      <DashboardSearchAndActionPage
        className='justify-start'
        action={
          <div className=''>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
          </div>
        }
      />
      <Suspense fallback={<NoteTableSkeleton />}>
        <NotesTableWithPagination searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AdminNotes;

async function NotesTableWithPagination({searchParams}: IAdminNotesProps) {
  const {page, search} = searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  const notes = await GetAllNotes(token, search, page);
  return (
    <>
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
          {notes.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            notes.data?.map(note => (
              <TableRow key={note.id}>
                <TableCell className='w-50'>{formattedDate(note.createdAt)}</TableCell>
                <TableCell className='w-60'>
                  <Badge className={cn('', note.type == 'complaint' ? 'bg-red-500' : note.type == 'compliment' ? 'bg-green-500' : note.type == 'feedback' ? 'bg-amber-500' : note.type == 'inquiry' ? 'bg-fuchsia-700' : note.type == 'suggestion' ? 'bg-cyan-500' : 'default')}>{NOTE_TYPE_NAMES[note.type]}</Badge>
                </TableCell>
                {/* //TODO: add badge here by user role  */}
                <TableCell className=''>{note.text}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'dialog', item: <NoteDialog data={{type: note.type, text: note.text}} />}
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={notes.pageSize} totalCount={notes.totalCount} currentPage={notes.currentPage} hasNext={notes.hasNext} hasPrevious={notes.hasPrevious} totalPages={notes.totalPages} />
    </>
  );
}
