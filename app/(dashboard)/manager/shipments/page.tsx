import CurrentShipments from './_components/current-shipment';
import FinishedShipments from './_components/finished-shipment';

const Page = () => {
  return (
    <div>
      <CurrentShipments />
      <FinishedShipments />
    </div>
  );
};

export default Page;
