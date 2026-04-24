import {IUser} from '@/Interfaces/IUser';
import {NextResponse} from 'next/server';

const addUserInfoIntoHeader = async (res: NextResponse, user: IUser) => {
  res.headers.append('user-companyId', user.companyId);
  res.headers.append('user-email', user.email);
  res.headers.append('user-role', user.role);
  res.headers.append('user-id', user.id);
};
export default addUserInfoIntoHeader;