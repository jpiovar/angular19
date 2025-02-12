import { SpinnerState } from './spinner.models';
import * as SpinnerActions from './spinner.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SpinnerState = {
  isOn: false
};

// export function reducer(state = initialState, action: SpinnerActions.Actions): SpinnerState {
//   switch (action.type) {
//     case SpinnerActions.SPINNER_START: {
//       const newState = action.payload;
//       return {
//         ...state, ...newState
//       };
//     }

//     case SpinnerActions.SPINNER_STOP: {
//       const newState = action.payload;
//       return {
//         ...state, ...newState
//       };
//     }

//     default:
//       return state;
//   }
// }

const spinnerReducer = createReducer(
  initialState,
  on(SpinnerActions.StartSpinner, (state) => ({
    ...state,
    ...{isOn: true}
  })),
  on(SpinnerActions.StopSpinner, (state) => ({
    ...state,
    ...{isOn: false}
  }))
);

export function reducer(state: SpinnerState | undefined, action: Action) {
  return spinnerReducer(state, action);
}