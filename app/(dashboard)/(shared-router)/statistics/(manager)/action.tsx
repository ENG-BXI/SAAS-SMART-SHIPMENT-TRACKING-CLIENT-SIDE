'use server';

import {updateTag} from 'next/cache';

export async function RevalidateManagerStatistics() {
  updateTag('manager-statistics');
}
