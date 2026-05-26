import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {ISubscriptionForTable} from '../_interfaces/subscription-for-table';
import {TableEmpty} from '@/components/table-empty';
import {cn, formattedDate} from '@/lib/utils';
import {SUBSCRIPTION_STATUS, SUBSCRIPTION_TEXT} from '@/lib/Constant/enum';

interface IAllSubscriptions {
  subscriptions?: ISubscriptionForTable[];
}

function AllSubscriptions({subscriptions}: IAllSubscriptions) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-start'>الشركة</TableHead>
          <TableHead className='text-start'>نوع الباقة</TableHead>
          <TableHead className='text-start'>السعر</TableHead>
          <TableHead className='text-start'>تاريخ البدء</TableHead>
          <TableHead className='text-start'>تاريخ الانتهاء</TableHead>
          <TableHead className='text-start'>حالة الاشتراك</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map(sub => {
            return (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-gray-900'>{sub.companyName}</span>
                    <span className='text-xs text-gray-500'>{sub.companyLocation}</span>
                  </div>
                </TableCell>
                <TableCell className='capitalize'>{sub.subscriptionType}</TableCell>
                <TableCell>${sub.price}</TableCell>
                <TableCell>{formattedDate(sub.startDate)}</TableCell>
                <TableCell>{formattedDate(sub.endDate)}</TableCell>
                <TableCell>
                  <Badge className={cn(sub.status == SUBSCRIPTION_STATUS.ACTIVE && 'bg-green-500', sub.status == SUBSCRIPTION_STATUS.PENDING && 'bg-yellow-500', sub.status == SUBSCRIPTION_STATUS.EXPIRED && 'bg-red-500', sub.status == SUBSCRIPTION_STATUS.INACTIVE && 'bg-gray-500')}>
                    {SUBSCRIPTION_TEXT[sub.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6}>
              <TableEmpty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AllSubscriptions;
