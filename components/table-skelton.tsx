import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from './ui/table';
import {Skeleton} from './ui/skeleton';

export function TableSkelton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className=' h-6 rounded bg-gray-200' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
