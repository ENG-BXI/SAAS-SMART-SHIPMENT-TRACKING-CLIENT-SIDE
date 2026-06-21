import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import NoteDialog from './_components/note-dialog';
import {cookies} from 'next/headers';
import GetAllNotes from './_services/get-all-notes';
import {cn, formattedDate} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import {Suspense} from 'react';
import {NOTE_TYPE_NAMES} from '@/lib/Constant/note-type';
import DeleteNoteDialog from './_components/delete-note-dialog';
import {NoteTableSkeleton} from '../_components/skeletons';
import NoteRealTime from '../_components/note-real-time';
interface IManagerNotesProps {
  searchParams: {search?: string; page?: string};
}
const ManagerNotes = async ({searchParams}: IManagerNotesProps) => {
  return (
    <div>
      <NoteRealTime />
      <PageDashboardHeader
        title='الملاحظات'
        description='يتيح هذا القسم للشركات إرسال ملاحظات، شكاوى، أو طلبات تغيير إلى إدارة النظام. يتم عرض جميع الملاحظات مباشرة في لوحة تحكم الأدمن لمراجعتها واتخاذ الإجراء المناسب.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/'},
          {text: 'الملاحظات', path: '/manager/notes'}
        ]}
      />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <NoteDialog type='add' triggerTitle='اضافة ملاحظة جديدة' />
          </div>
        }
      />
      <Suspense fallback={<NoteTableSkeleton />}>
        <NoteTableAndPagination searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ManagerNotes;

async function NoteTableAndPagination({searchParams}: IManagerNotesProps) {
  const {page, search} = searchParams;
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const response = await GetAllNotes(token, search, page);
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
          {response.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            response.data?.map(note => (
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
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <NoteDialog type='edit' id={note.id} triggerTitle='تعديل بيانات الملاحظة' data={{type: note.type, text: note.text}} />},
                      {
                        type: 'dialog',
                        item: <DeleteNoteDialog id={note.id} />
                      }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={response.pageSize} totalCount={response.totalCount} currentPage={response.currentPage} hasNext={response.hasNext} hasPrevious={response.hasPrevious} totalPages={response.totalPages} />
    </>
  );
}
