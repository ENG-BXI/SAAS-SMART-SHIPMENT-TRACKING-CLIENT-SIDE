import React from 'react';
import {Field, FieldError} from './ui/field';
import {cn} from '@/lib/utils';
import {Popover, PopoverContent, PopoverTrigger} from './ui/popover';
import {Button} from './ui/button';
import {Calendar} from './ui/calendar';
import {Label} from './ui/label';
import {ChevronDownIcon} from 'lucide-react';
import {format} from 'date-fns';
interface CustomCalenderProps {
  label?: string;
  placeHolder?: string;
  className?: string;
  invalid?: boolean;
  value: Date;
  onChange: (date: Date) => void;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  defaultMonth?: Date;
}
const CustomCalender = ({label, placeHolder, className, defaultMonth, invalid, value, onChange, required, errorMessage, disabled}: CustomCalenderProps) => {
  return (
    <Field className={cn(className)} data-invalid={invalid}>
      {label && (
        <Label className='text-md'>
          {label} {required && <span className='text-red-500'>{'*'}</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' data-empty={!value} className='w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground' disabled={disabled}>
            {value ? format(value, 'PPP') : <span>{placeHolder}</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' required defaultMonth={defaultMonth} selected={value} onSelect={onChange} />
        </PopoverContent>
      </Popover>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
};

export default CustomCalender;
