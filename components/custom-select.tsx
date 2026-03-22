import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {Field, FieldError} from '@/components/ui/field';
import {Label} from '@/components/ui/label';
import {RefCallBack} from 'react-hook-form';
import { cn } from '@/lib/utils';
export interface IOption {
  value: string;
  label: string;
}
interface CustomSelectProps {
  label?: string;
  required?: boolean;
  placeHolder?: string;
  onChange?: (value: string) => void;
  value?: string;
  ref?: RefCallBack;
  invalid?: boolean;
  errorMessage?: string;
  options: IOption[];
  className?: string;
  dir?: 'ltr' | 'rtl';
}
function CustomSelect({onChange, label, required, value, ref, invalid, errorMessage, options, placeHolder, className, dir='rtl'}: CustomSelectProps) {
  return (
    <Field className={cn(className)} data-invalid={invalid}>
      {label && (
        <Label className='text-md'>
          {label} {required && <span className='text-red-500'>{'*'}</span>}
        </Label>
      )}
      <Select dir={dir} onValueChange={onChange} defaultValue={value}>
        <SelectTrigger >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent ref={ref}>
          <SelectItem value='0' disabled>
            {placeHolder}
          </SelectItem>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}
export default CustomSelect;
