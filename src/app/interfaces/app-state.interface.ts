import { Action, ActionReducer } from '@ngrx/store';

import { IAuthState } from './auth-state.interface';

export interface IAppState {
  auth: ActionReducer<IAuthState, Action>;
}
