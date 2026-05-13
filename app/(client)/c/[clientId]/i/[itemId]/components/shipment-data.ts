export const shipment = {
  shipmentNumber: 'SS-2026-0421',
  status: 'في الطريق',
  company: {
    name: 'شركة ARAMCO لشحن البضائع'
  },
  client: {
    name: 'شركة المستقبل للصناعات',
    contactWays: [
      {text: '0599 123 456', contactType: 'phoneNumber', isPrimary: true},
      {text: 'info@almustaqbal.com', contactType: 'email', isPrimary: false}
    ]
  },
  driver: {
    userName: 'عبدالله الراشد',
    phoneNumber: '0500 987 654'
  },
  way: {
    name: 'مسار الرياض - الدمام',
    points: ['مستودع الرياض', 'الخرج', 'محطة الهفوف', 'نقطة تسليم الدمام']
  },
  currentPoint: {
    name: 'محطة الهفوف',
    order: 3
  },
  launchDate: '2026-05-11T09:30:00.000Z',
  estimatedArrival: '2026-05-14T18:00:00.000Z',
  items: [
    {name: 'مولد كهربائي', quantity: 2, isBreakable: true},
    {name: 'معدات السلامة', quantity: 5, isBreakable: false},
    {name: 'أدوات صيانة', quantity: 3, isBreakable: false}
  ],
  route: {
    from: 'مستودع الرياض',
    to: 'نقطة تسليم الدمام',
    estimatedDistance: '315 كم',
    eta: '14 مايو 18:00'
  },
  timeline: [
    {title: 'تم استلام الشحنة', description: 'الشحنة غادرت المستودع الرئيسي في الرياض.', time: '11 مايو 09:30', status: 'done'},
    {title: 'عبور نقطة التفتيش', description: 'الخرج تم اجتيازها بنجاح.', time: '12 مايو 14:00', status: 'done'},
    {title: 'الوصول لمحطة الهفوف', description: 'الشحنة الآن في المحطة الحالية.', time: 'الآن', status: 'current'},
    {title: 'تسليم في الدمام', description: 'الشحنة متجهة للوجهة النهائية.', time: '14 مايو 18:00', status: 'upcoming'}
  ]
};

export const progressValue = Math.round(((shipment.currentPoint.order - 1) / (shipment.way.points.length - 1)) * 100);
export const remainingPoints = shipment.way.points.length - shipment.currentPoint.order;

export const contactLabel = (type: string) => (type === 'email' ? 'البريد الإلكتروني' : 'الهاتف');
