import {ReactNode} from 'react';

export interface ICustomButton {
  text: string;
  icon?: ReactNode;
  type?: 'primary' | 'secondary' | 'danger';
  className?: string;
  IsSubmit?: boolean;
  disable?: boolean;
}
