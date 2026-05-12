export interface IShipmentFromBackend {
  id: string;
  shipmentNumber: string;
  launchDate: string;
  endDate: string;
  isCompleted: boolean;
  isPaused: boolean;
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
