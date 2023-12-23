import { createAction, props } from '@ngrx/store';

import { IUser } from '../../../interfaces';

const prefix = '[Auth]';

const setUser = createAction(
  `${prefix} Set user`,
  props<{ value: IUser | null }>()
);

export { setUser };
