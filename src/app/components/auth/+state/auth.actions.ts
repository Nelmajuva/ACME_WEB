import { createAction, props } from '@ngrx/store';

const prefix = '[Auth]';

const setLoading = createAction(
  `${prefix} Set value of loading`,
  props<{ value: boolean }>
);

export { setLoading };
