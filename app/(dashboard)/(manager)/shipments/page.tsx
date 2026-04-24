import CurrentShipments from './_components/current-shipment';
import FinishedShipments from './_components/finished-shipment';

const Page = async ({searchParams}: {searchParams: Promise<{c?: string; cs: string; f?: string; fs: string}>}) => {
  const {c, cs, f, fs} = await searchParams;
  return (
    <div>
      <CurrentShipments search={cs} page={c} />
      <FinishedShipments search={fs} page={f} />
    </div>
  );
};

export default Page;
