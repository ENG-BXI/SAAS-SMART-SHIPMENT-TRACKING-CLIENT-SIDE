import {Input} from './ui/input';
import {Label} from './ui/label';

interface ICustomInputWithLabelForViewPage {
  label: string;
  value: string;
}
function CustomInputWithLabelForViewPage({label, value}: ICustomInputWithLabelForViewPage) {
  return (
    <div className='flex gap-x-3'>
      <Label className='text-nowrap w-25'>{label}</Label>
      <Input className='w-full' value={value} />
    </div>
  );
}

export default CustomInputWithLabelForViewPage;
