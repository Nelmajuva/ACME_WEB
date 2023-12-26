import { ICity } from "./city.interface";
import { ITypeOfAccount } from "./type-of-account.interface";

export interface IResourceAccount {
  cities: ICity[];
  types_of_accounts: ITypeOfAccount[];
}