import { RecordsState } from './records/records.models';
import { SpinnerState } from './spinner/spinner.models';

export interface AppState {
  readonly router: any;
  readonly records: RecordsState;
  readonly spinner: SpinnerState;
}
