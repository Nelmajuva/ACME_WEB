import { createReducer, on } from '@ngrx/store';

import * as actions from './auth.actions';
import { IAuthState } from '../../../interfaces';

const initialState: IAuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, { value }) => ({ ...state, user: value }))
);
