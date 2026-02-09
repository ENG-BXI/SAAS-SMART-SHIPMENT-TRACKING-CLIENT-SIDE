import {ICustomInput} from '../_Types/ICustomInput';
import {Input} from './ui/input';
import {Label} from './ui/label';

function CustomInput({value, setValue, className, required, placeHolder, ...props}: ICustomInput) {
  return (
    <div className={`flex-1 flex flex-col gap-y-2 ${className}`}>
      {props.hasLabel && (
        <Label className='text-md'>
          {props.label}
          <span className='text-red-500'>{required && '*'}</span>
        </Label>
      )}
      <Input value={value} onChange={e => setValue(e.target.value)} placeholder={placeHolder} />
    </div>
  );
}
export default CustomInput;
