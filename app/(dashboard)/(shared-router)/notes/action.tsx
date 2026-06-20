'use server';

import {updateTag} from 'next/cache';

export async function RevalidateNote() {
  updateTag('all-note');
}
