import { IUser } from "./user.interface";

export interface ISignInWithEmailAndPasswordResponse {
  access_token: string;
  user: IUser;
}