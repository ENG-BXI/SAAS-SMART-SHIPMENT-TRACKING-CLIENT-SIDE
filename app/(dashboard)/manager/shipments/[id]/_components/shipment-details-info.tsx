interface ShipmentDetailsInfoProps {
  title: string;
  value: string;
}
export function ShipmentDetailsInfo({title, value}: ShipmentDetailsInfoProps) {
  return (
    <div className='border-s-2 border-s-custom-primary-color ps-2'>
      <h4 className='text-[15px]'>{title}</h4>
      <span className='text-lg'>{value}</span>
    </div>
  );
}
