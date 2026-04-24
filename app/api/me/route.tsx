import {getUser} from '@/lib/utils';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({message: 'Token not found', data: null}, {status: 401});
  }
  const user = getUser(token);
  if (!user) {
    return NextResponse.json({message: 'User not found', data: null}, {status: 401});
  }
  return NextResponse.json({message: 'Get user successfully', data: user});
}
