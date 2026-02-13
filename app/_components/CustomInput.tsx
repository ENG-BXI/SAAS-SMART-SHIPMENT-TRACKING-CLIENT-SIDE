import {ReactNode} from 'react';
import {ICustomInput} from '../_Types/ICustomInput';
import {Field, FieldError} from './ui/field';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {FieldValues, FieldError as TypeFieldError} from 'react-hook-form';

function CustomInput<T extends FieldValues>({disabled, className, required, placeHolder, ...props}: ICustomInput<T>) {
  return (
    <InputLayout type={props.type} error={props.type == 'controller' ? props.error : undefined} invalid={props.type == 'controller' ? props.invalid : undefined} className={className}>
      {props.hasLabel && (
        <Label className='text-md'>
          {props.label}
          <span className='text-red-500'>{required && '*'}</span>
        </Label>
      )}
      <Input disabled={disabled} aria-invalid={props.type =='controller'? props.invalid :undefined} className={disabled ? 'cursor-not-allowed' : 'cursor-text'} value={props.type == 'state' || props.type == 'view' ? props.value : undefined} onChange={e => props.type == 'state' && props.setValue(e.target.value)} placeholder={placeHolder} {...(props.type == 'controller' && props.field)} />
    </InputLayout>
  );
}
export default CustomInput;

interface IInputLayout {
  type: 'controller' | 'state' | 'view';
  invalid?: boolean;
  className?: string;
  error?: TypeFieldError;
  children: ReactNode;
}
function InputLayout({type, children, invalid, error, className}: IInputLayout) {
  return type == 'controller' ? (
    <Field data-invalid={invalid} className={` ${className}`}>
      {children}
      {invalid && <FieldError errors={[error]} />}
    </Field>
  ) : (
    <div className={`flex-1 flex flex-col gap-y-2 ${className}`}> {children}</div>
  );
}
