import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {ISubscriptionForTable} from '../_interfaces/subscription-for-table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import SubscriptionDialog from './subscription-dialog';
import DeleteSubscriptionDialog from './delete-subscription-dialog';
import {useTranslations} from 'next-intl';

interface IAllSubscriptions {
  subscriptions?: ISubscriptionForTable[];
}

function AllSubscriptions({subscriptions}: IAllSubscriptions) {
  const t = useTranslations('adminSubscriptionsPage.table');
  const tEmpty = useTranslations('tableEmpty');
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-start'>{t('columns.planType')}</TableHead>
          <TableHead className='text-start'>{t('columns.price')}</TableHead>
          <TableHead className='text-start'>{t('columns.duration')}</TableHead>
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
                <TableCell className='font-semibold'>{sub.type}</TableCell>
                <TableCell>{sub.price}</TableCell>
                <TableCell>
                  {isYearly ? durationByYear : sub.durationByMonth} {isYearly ? t('format.year') : t('format.month')}
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
              <TableEmpty text={tEmpty('subscriptions')} action={<SubscriptionDialog type='add' />} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AllSubscriptions;
