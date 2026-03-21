import {IconCircleCheck} from '@tabler/icons-react';
import {memo} from 'react';
interface CardStatProps {
  title: string;
  value: string;
}
function CardStat({title, value}: CardStatProps) {
  return (
    <div className='border rounded-lg flex-1 min-w-80  p-4'>
      <div className='rounded-full bg-[#F3FCF6] p-2 max-w-min'>
        <IconCircleCheck />
      </div>
      <h3 className='font-bold mt-2'>{title}</h3>
      <p className='text-gray-500'>{value}</p>
    </div>
  );
}
export default memo(CardStat) as typeof CardStat;
