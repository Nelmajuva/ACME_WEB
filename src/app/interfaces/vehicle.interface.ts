import { ITypeOfVehicle } from './type-of-vehicle.interface';
import { IMotorOfVehicle } from './motor-of-vehicle.interface';
import { IAccount } from './account.interface';
import { IBrandOfVehicle } from './brand-of-vehicle.interface';

export interface IVehicle {
  uuid: string;
  plate: string;
  color: string;
  motor_of_vehicle: IMotorOfVehicle;
  motor_of_vehicle_id: number;
  type_of_vehicle_id: number;
  type_of_vehicle: ITypeOfVehicle;
  brand_of_vehicle: IBrandOfVehicle;
  driver_uuid: string;
  driver: IAccount;
  owner_uuid: string;
  owner: IAccount;
  created_at: string;
  updated_at: string;
  status: boolean;
}
