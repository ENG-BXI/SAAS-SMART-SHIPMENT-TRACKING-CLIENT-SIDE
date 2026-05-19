export const SHIPMENT_STATUS = {
  COMPLETED: 'منتهية',
  PAUSED: 'متوقفة',
  CURRENT: 'حالية'
} as const;

export type TShipmentStatus = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];
