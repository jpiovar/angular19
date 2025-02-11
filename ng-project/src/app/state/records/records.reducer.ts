
// import * as RecordsActions from './records.actions';



// export function reducer(state = initialState, action: RecordsActions.Actions): RecordsState {
//   switch (action.type) {
//     case RecordsActions.RECORDS_LOAD: {
//       return {
//         ...state,
//         loading: true,
//         error: false
//       };
//     }

//     case RecordsActions.RECORDS_LOAD_SUCCESS: {
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null
//       };
//     }

//     case RecordsActions.RECORDS_LOAD_FAIL: {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };
//     }


//     default:
//       return state;
//   }
// }


import { Action, createReducer, on } from '@ngrx/store';
import * as RecordsActions from './records.actions';
import { RecordsState } from './records.models';

export const initialState: RecordsState = {
  data: null,
  loading: false,
  error: null
};


const recordsReducer = createReducer(
  initialState,
  on(RecordsActions.RecordsLoad, (state, { payload }) => ({
    ...state,
    loading: true,
    error: false
  })),
  on(RecordsActions.RecordsLoadSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
    error: null
  })),
  on(RecordsActions.RecordsLoadFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  }))
);

export function reducer(state: RecordsState | undefined, action: Action) {
  return recordsReducer(state, action);
}