import CurrentShipments from './_components/current-shipment';
import FinishedShipments from './_components/finished-shipment';
import ShipmentRealTime from './_components/shipment-real-time';

const Page = async ({searchParams}: {searchParams: Promise<{c?: string; cs: string; f?: string; fs: string}>}) => {
  const {c, cs, f, fs} = await searchParams;
  return (
    <div>
      <ShipmentRealTime />
      <CurrentShipments search={cs} page={c} />
      <FinishedShipments search={fs} page={f} />
    </div>
  );
};

export default Page;
