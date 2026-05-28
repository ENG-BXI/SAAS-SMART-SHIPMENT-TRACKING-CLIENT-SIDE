import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {ISubscriptionForTable} from '../_interfaces/subscription-for-table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import SubscriptionDialog from './subscription-dialog';
import DeleteSubscriptionDialog from './delete-subscription-dialog';
interface IAllSubscriptions {
  subscriptions?: ISubscriptionForTable[];
}

function AllSubscriptions({subscriptions}: IAllSubscriptions) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-start'>نوع الباقة</TableHead>
          <TableHead className='text-start'>السعر</TableHead>
          <TableHead className='text-start'>عدد الاشهر</TableHead>
          <TableHead className=''></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map(sub => {
            const isYearly = sub.durationByMonth >= 12;
            const durationByYear = sub.durationByMonth / 12;
            return (
              <TableRow key={sub.id}>
                <TableCell className='font-semibold text-gray-900'>{sub.type}</TableCell>
                <TableCell>{sub.price}</TableCell>
                <TableCell>
                  {isYearly ? durationByYear : sub.durationByMonth} {isYearly ? 'سنة' : 'شهر'}
                </TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'dialog', item: <SubscriptionDialog type='edit' id={sub.id} data={{type: sub.type, price: sub.price, durationByMonth: sub.durationByMonth}} />},
                      {type: 'dialog', item: <DeleteSubscriptionDialog subscriptionId={sub.id} subscriptionType={sub.type} />}
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={4}>
              <TableEmpty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AllSubscriptions;
