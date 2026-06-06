import {IconPlane, IconTruck} from '@tabler/icons-react';
import {ShipWheelIcon, Train} from 'lucide-react';
import {ElementType} from 'react';
interface ServicesItem {
  icon: ElementType;
  title: string;
  description: string;
}
const listServiceItems: ServicesItem[] = [
  {
    icon: IconTruck,
    title: 'Truck',
    description: 'Reliable ground transportation for shipments across the United States with flexible fleet options.'
  },
  {
    icon: IconPlane,
    title: 'Air Freight',
    description: 'Fast delivery of time-sensitive cargo using global air routes with real-time tracking.'
  },
  {
    icon: ShipWheelIcon,
    title: 'Ship Freight',
    description: 'Cost-effective shipping solution for bulk cargo with dependable international sea freight services.'
  },
  {
    icon: Train,
    title: 'Rail Freight',
    description: 'Efficient and eco-friendly rail transport option ideal for long-distance heavy shipments.'
  }
];
const Services = () => {
  return (
    <div className='flex flex-col items-center my-20'>
      <p className='text-custom-primary-color text-xl mb-2'>Our Services</p>
      <h2 className='section__title'>Trusted Logistics Partner for Worldwide Shipping</h2>
      <div className='flex gap-x-10 mt-10 mx-10'>
        {listServiceItems.map(item => (
          <ServicesItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Services;

function ServicesItem({title, icon, description}: ServicesItem) {
  const Icon = icon;
  return (
    <div>
      <Icon className='size-20 stroke-1 text-custom-primary-color' />
      <h3 className='text-xl mb-2'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}
