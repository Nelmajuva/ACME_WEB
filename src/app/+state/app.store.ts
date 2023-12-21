import { IAppState } from "../interfaces";
import { authReducer } from "../components/auth/+state/auth.reducer";

export const appState: IAppState = {
  auth: authReducer,
}