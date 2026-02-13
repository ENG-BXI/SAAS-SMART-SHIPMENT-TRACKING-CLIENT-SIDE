import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia} from '@/app/_components/ui/empty';
import {Button} from '@/app/_components/ui/button';
import { Folder } from 'lucide-react';

export function TableEmpty() {
  return (
    <Empty className=''>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Folder />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyDescription>You haven&apos;t created any projects yet. Get started by creating your first project.</EmptyDescription>
      <EmptyContent className='flex-row justify-center gap-2'>
        <Button>Create Project</Button>
        <Button variant='outline'>Import Project</Button>
      </EmptyContent>
    </Empty>
  );
}
