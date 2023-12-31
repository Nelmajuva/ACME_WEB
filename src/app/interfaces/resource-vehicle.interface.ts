import { IAccount } from './account.interface';
import { IBrandOfVehicle } from './brand-of-vehicle.interface';
import { IMotorOfVehicle } from './motor-of-vehicle.interface';
import { ITypeOfAccount } from './type-of-account.interface';

export interface IResourceVehicle {
  drivers: IAccount[];
  motors_of_vehicles: IMotorOfVehicle[];
  owners: IAccount[];
  types_of_vehicles: ITypeOfAccount[];
  brands_of_vehicles: IBrandOfVehicle[];
}
