import { createReducer, on } from '@ngrx/store';

import * as actions from './auth.actions';
import { IAuthState } from '../../../interfaces';

const initialState: IAuthState = {
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(actions.setLoading, (state, { _p }) => ({ isLoading: _p.value }))
);
