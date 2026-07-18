import {Input} from './ui/input';
import {Label} from './ui/label';

interface ICustomInputWithLabelForViewPage {
  label: string;
  value: string|number;
}
function CustomInputWithLabelForViewPage({label, value}: ICustomInputWithLabelForViewPage) {
  return (
    <div className='flex gap-x-3'>
      <Label className='text-nowrap w-35'>{label}</Label>
      <Input className='w-full cursor-not-allowed' value={value} />
    </div>
  );
}

export default CustomInputWithLabelForViewPage;
