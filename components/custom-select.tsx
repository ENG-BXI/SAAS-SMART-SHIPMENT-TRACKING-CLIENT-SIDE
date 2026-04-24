import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {Field, FieldError} from '@/components/ui/field';
import {Label} from '@/components/ui/label';
import {RefCallBack} from 'react-hook-form';
import {cn} from '@/lib/utils';
import {Ban, Loader2} from 'lucide-react';
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
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}
function CustomSelect({onChange, label, required, value, ref, invalid, errorMessage, options, placeHolder, className, dir = 'rtl', disabled = false, isLoading = false, isError = false, error}: CustomSelectProps) {
  return (
    <Field className={cn(className)} data-invalid={invalid}>
      {label && (
        <Label className='text-md'>
          {label} {required && <span className='text-red-500'>{'*'}</span>}
        </Label>
      )}
      <Select disabled={disabled} dir={dir} onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          {isLoading && (
            <div className='flex items-center gap-2'>
              <Loader2 className='min-w-5 min-h-5 animate-spin' />
              جاري التحميل...
            </div>
          )}
          {isError && (
            <div className='flex items-center gap-2 text-red-500'>
              <Ban className='text-red-500 min-w-5 min-h-5' /> {error}
            </div>
          )}
          {!isLoading && !isError && <SelectValue placeholder={placeHolder} />}
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
