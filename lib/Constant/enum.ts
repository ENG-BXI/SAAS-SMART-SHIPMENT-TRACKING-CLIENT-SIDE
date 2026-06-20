export const SHIPMENT_STATUS = {
  COMPLETED: 'منتهية',
  PAUSED: 'متوقفة',
  CURRENT: 'حالية'
} as const;

export enum SHIPMENT_NUMBER {
  COMPLETED,
  PAUSED,
  CURRENT
}
export const SHIPMENT_NAME: Record<SHIPMENT_NUMBER, TShipmentStatus> = {
  [SHIPMENT_NUMBER.CURRENT]: SHIPMENT_STATUS.CURRENT,
  [SHIPMENT_NUMBER.PAUSED]: SHIPMENT_STATUS.PAUSED,
  [SHIPMENT_NUMBER.COMPLETED]: SHIPMENT_STATUS.COMPLETED
};
export type TShipmentStatus = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

export const SUBSCRIPTION_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CHANGE: 'change'
} as const;

export const SUBSCRIPTION_TEXT = {
  pending: 'معلق',
  active: 'نشط',
  inactive: 'غير نشط',
  expired: 'منتهي',
  change: 'تحت التتغير'
};

export type TSubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];
