'use server';

import {updateTag} from 'next/cache';

export async function RevalidateAdminStatistics() {
  updateTag('admin-statistics');
}
