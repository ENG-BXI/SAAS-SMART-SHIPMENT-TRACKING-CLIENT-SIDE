import serverAxiosInstance from '@/lib/axios/server';
import {CLIENT, SHIPMENT} from '@/lib/Constant/routes';
interface IShipmentItem {
  name: string;
  quantity: number;
  isBreakable: boolean;
}
interface IContactWays {
  text: string;
  contactType: string;
  isPrimary: boolean;
}
interface IPoint {
  name: string;
  isCurrent: boolean;
}
interface IResponse {
  shipmentNumber: string;
  wayPointsLength: number;
  firstPoint: string;
  lastPoint: string;
  shipmentStatus: number;
  companyName: string;
  reminderPoint: number;
  percentageOfPoint: number;
  shipmentItem: IShipmentItem[];
  clientNameAndContactWay: {
    name: string;
    contactWays: IContactWays[];
  };
  allPointName: IPoint[];
  driverInfo: {
    userName: string;
    phoneNumber: string;
    email: string;
  };
  nextPoint: {
    id: string;
    name: string;
  };
}

const GetShipmentDetails = async ({clientId, shipmentId}: {clientId: string; shipmentId: string}) => {
  const response = await serverAxiosInstance.get(`${CLIENT}/${clientId}/${SHIPMENT}/${shipmentId}`);
  const data = response.data.data as IResponse;
  console.log(data);
  
  return data;
};

export default GetShipmentDetails;
