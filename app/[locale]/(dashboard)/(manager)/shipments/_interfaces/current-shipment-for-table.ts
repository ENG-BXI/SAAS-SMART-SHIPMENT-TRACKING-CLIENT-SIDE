export interface ICurrentShipmentForTable {
  id: string;
  shipmentNumber: string;
  launchDate: string;
  way: {
    name: string;
  };
  currentPoint: {
    name: string;
  };
  driver: {
    userName: string;
  };
}
