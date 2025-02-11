import { Action, createAction  } from '@ngrx/store';
import { RecordsState } from './records.models';


export const RECORDS_LOAD = '[Records] Load data';
export const RECORDS_LOAD_SUCCESS = '[Records] Load data success';
export const RECORDS_LOAD_FAIL = '[Records] Load data fail';

export const RecordsLoad = createAction(RECORDS_LOAD, (payload: string) => ({ payload }));
export const RecordsLoadSuccess = createAction(RECORDS_LOAD_SUCCESS, (payload: RecordsState) => ({ payload }));
export const RecordsLoadFail = createAction(RECORDS_LOAD_FAIL, (payload: any) => ({ payload }));


// export class RecordsLoad implements Action {
//   readonly type = RECORDS_LOAD;
//   constructor(public payload: string) {}
// }

// export class RecordsLoadSuccess implements Action {
//   readonly type = RECORDS_LOAD_SUCCESS;
//   constructor(public payload: RecordsState) {}
// }

// export class RecordsLoadFail implements Action {
//   readonly type = RECORDS_LOAD_FAIL;
//   constructor(public payload: any) {}
// }


export type Actions = ReturnType<typeof RecordsLoad> | ReturnType<typeof RecordsLoadSuccess> | ReturnType<typeof RecordsLoadFail>;
