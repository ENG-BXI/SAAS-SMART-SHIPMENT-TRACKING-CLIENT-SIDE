export interface IShipmentFromBackend {
  id: string;
  shipmentNumber: string;
  launchDate: string;
  way: {
    id: string;
    name: string;
  };
  currentPoint: {
    name: string;
  };
  driver: {
    id: string;
    userName: string;
  };
}
