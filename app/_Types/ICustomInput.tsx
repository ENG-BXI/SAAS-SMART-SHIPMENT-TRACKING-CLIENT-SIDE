import {Dispatch, SetStateAction} from 'react';
interface CustomInputWithLabel {
  hasLabel?: true;
  label: string;
}
interface CustomInputWithoutLabel {
  hasLabel?: false;
}
interface IBaseCustomInput {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
  required?: boolean;
  placeHolder?: string;
}
export type ICustomInput = (CustomInputWithLabel & IBaseCustomInput) | (CustomInputWithoutLabel & IBaseCustomInput);
