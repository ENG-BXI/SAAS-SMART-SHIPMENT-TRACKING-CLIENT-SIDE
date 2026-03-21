import {Dispatch, SetStateAction} from 'react';
import {ControllerRenderProps, FieldError, FieldValues} from 'react-hook-form';
interface CustomInputWithLabel {
  hasLabel?: true;
  label: string;
}
interface CustomInputWithoutLabel {
  hasLabel?: false;
}
interface IInputByFieldAndController<T extends FieldValues> {
  type: 'controller';
  field: ControllerRenderProps<T>;
  invalid: boolean;
  error: FieldError | undefined;
}
interface IInputByState {
  type: 'state';
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
interface IInputForView {
  type: 'view';
  value: string;
}
type IBaseCustomInput = {
  className?: string;
  required?: boolean;
  placeHolder?: string;
  disabled?: boolean;
};
export type ICustomInput<T extends FieldValues> = (IInputByFieldAndController<T> | IInputByState | IInputForView) & ((CustomInputWithLabel & IBaseCustomInput) | (CustomInputWithoutLabel & IBaseCustomInput));
