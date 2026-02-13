import {Dispatch, ReactNode, SetStateAction} from 'react';

export interface IDashboardSearchAndActionPage {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  action: ReactNode;
}
