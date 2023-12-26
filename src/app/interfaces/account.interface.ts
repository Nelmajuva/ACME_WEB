import { ICity } from './city.interface';
import { ITypeOfAccount } from './type-of-account.interface';

export interface IAccount {
  address: string;
  city: ICity;
  created_at: string;
  document: string;
  first_name: string;
  phone_number: string;
  second_name: string;
  status: boolean;
  surnames: string;
  type_of_account: ITypeOfAccount;
  updated_at: string;
  uuid: string;
}
