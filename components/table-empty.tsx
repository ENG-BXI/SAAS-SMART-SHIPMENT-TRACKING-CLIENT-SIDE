import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia} from '@/components/ui/empty';
import {Folder} from 'lucide-react';
import {ReactNode} from 'react';
interface TableEmptyProps {
  text: string;
  action?: ReactNode;
}
export function TableEmpty({text, action}: TableEmptyProps) {
  return (
    <Empty className=''>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Folder />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyDescription>{text}</EmptyDescription>
      <EmptyContent className='flex-row justify-center gap-2'>{action}</EmptyContent>
    </Empty>
  );
}
