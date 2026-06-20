'use server';

import {updateTag} from 'next/cache';

export async function RevalidateClientShipmentDetails() {
  updateTag('client-shipment-details');
}
