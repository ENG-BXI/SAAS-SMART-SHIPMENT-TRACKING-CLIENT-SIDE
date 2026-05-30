'use server';

import {cookies} from 'next/headers';

export async function logout() {
  const cookie = await cookies();
  cookie.delete('token');
  return {message: 'تم تسجيل الخروج بنجاح', error: null};
}
