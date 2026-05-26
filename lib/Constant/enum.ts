export const SHIPMENT_STATUS = {
  COMPLETED: 'منتهية',
  PAUSED: 'متوقفة',
  CURRENT: 'حالية'
} as const;

export type TShipmentStatus = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

export const SUBSCRIPTION_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired'
} as const;

export const SUBSCRIPTION_TEXT = {
  pending: 'معلق',
  active: 'نشط',
  inactive: 'غير نشط',
  expired: 'منتهي'
};

export type TSubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];
