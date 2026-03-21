import { ICurrentShipmentForTable } from "./current-shipment-for-table";

export interface IFinishedShipmentForTable extends ICurrentShipmentForTable {
  arrivalDate: string;
}
